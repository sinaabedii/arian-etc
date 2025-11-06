// Chat Assistant service for backend API communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://172.20.20.66:8088';

export interface ChatMessage {
  message: string;
  session_id: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  timestamp: string;
  model_used: string;
}

export interface FeedbackRequest {
  message_id: number;
  was_helpful: boolean;
}

export interface ChatHistoryItem {
  id: number;
  message: string;
  response: string;
  model_used: string;
  response_time: number;
  created_at: string;
  was_helpful: boolean | null;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

class ChatService {
  private baseUrl: string;
  private currentSessionId: string | null = null;
  private readonly SESSIONS_KEY = 'chat_sessions';
  private readonly CURRENT_SESSION_KEY = 'current_chat_session';

  constructor() {
    this.baseUrl = API_BASE_URL;
    if (typeof window !== 'undefined') {
      this.currentSessionId = localStorage.getItem(this.CURRENT_SESSION_KEY);
    }
  }

  /**
   * Generate a new session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all saved sessions
   */
  getAllSessions(): ChatSession[] {
    if (typeof window === 'undefined') return [];
    
    const sessionsData = localStorage.getItem(this.SESSIONS_KEY);
    if (!sessionsData) return [];
    
    try {
      const sessions = JSON.parse(sessionsData);
      return sessions.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt)
      }));
    } catch {
      return [];
    }
  }

  /**
   * Save sessions to localStorage
   */
  private saveSessions(sessions: ChatSession[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
  }

  /**
   * Get current session ID
   */
  getCurrentSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    if (!this.currentSessionId) {
      // Check if there's any existing session
      const sessions = this.getAllSessions();
      if (sessions.length > 0) {
        this.currentSessionId = sessions[0].id;
      } else {
        // Create a new session
        this.currentSessionId = this.createNewSession();
      }
      localStorage.setItem(this.CURRENT_SESSION_KEY, this.currentSessionId);
    }
    
    return this.currentSessionId;
  }

  /**
   * Create a new chat session
   */
  createNewSession(title?: string): string {
    if (typeof window === 'undefined') return '';
    
    const sessionId = this.generateSessionId();
    const sessions = this.getAllSessions();
    
    const newSession: ChatSession = {
      id: sessionId,
      title: title || `گفتگوی ${sessions.length + 1}`,
      lastMessage: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    sessions.unshift(newSession);
    this.saveSessions(sessions);
    
    this.currentSessionId = sessionId;
    localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
    
    return sessionId;
  }

  /**
   * Switch to a different session
   */
  switchSession(sessionId: string): void {
    if (typeof window === 'undefined') return;
    
    this.currentSessionId = sessionId;
    localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
  }

  /**
   * Update session information
   */
  private updateSession(sessionId: string, updates: Partial<ChatSession>): void {
    if (typeof window === 'undefined') return;
    
    const sessions = this.getAllSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    
    if (index !== -1) {
      sessions[index] = {
        ...sessions[index],
        ...updates,
        updatedAt: new Date()
      };
      this.saveSessions(sessions);
    }
  }

  /**
   * Delete a session
   */
  deleteSession(sessionId: string): void {
    if (typeof window === 'undefined') return;
    
    let sessions = this.getAllSessions();
    sessions = sessions.filter(s => s.id !== sessionId);
    this.saveSessions(sessions);
    
    // If deleted session was current, switch to another or create new
    if (this.currentSessionId === sessionId) {
      if (sessions.length > 0) {
        this.switchSession(sessions[0].id);
      } else {
        this.createNewSession();
      }
    }
  }

  /**
   * Rename a session
   */
  renameSession(sessionId: string, newTitle: string): void {
    this.updateSession(sessionId, { title: newTitle });
  }

  /**
   * Send a chat message and get AI response
   */
  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    try {
      const sid = sessionId || this.getCurrentSessionId();
      
      const response = await fetch(`${this.baseUrl}/lumira/api/v1/assistant/public/v1/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          session_id: sid,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      
      // Update session with last message
      this.updateSession(sid, {
        lastMessage: message.substring(0, 50) + (message.length > 50 ? '...' : '')
      });
      
      return data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  }

  /**
   * Submit feedback for a chat message
   */
  async submitFeedback(messageId: number, wasHelpful: boolean): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/lumira/api/v1/assistant/public/v1/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_id: messageId,
          was_helpful: wasHelpful,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }

  /**
   * Get chat history for a specific session
   */
  async getChatHistory(sessionId?: string): Promise<ChatHistoryItem[]> {
    try {
      const sid = sessionId || this.getCurrentSessionId();
      
      const response = await fetch(
        `${this.baseUrl}/lumira/api/v1/assistant/public/v1/history/?session_id=${sid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatHistoryItem[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
