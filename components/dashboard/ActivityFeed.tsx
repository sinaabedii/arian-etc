'use client';

import React from 'react';
import Image from 'next/image';

interface Activity {
  id: string;
  type: 'user' | 'order' | 'contact' | 'product' | 'system';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  maxItems = 5,
  showViewAll = true,
  onViewAll,
  className = ''
}) => {
  const displayedActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: string, status?: string) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm";
    
    switch (type) {
      case 'user':
        return (
          <div className={`${baseClasses} bg-blue-100 text-blue-600`}>
            👤
          </div>
        );
      case 'order':
        const orderColor = status === 'success' ? 'bg-green-100 text-green-600' : 
                          status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600';
        return (
          <div className={`${baseClasses} ${orderColor}`}>
            📦
          </div>
        );
      case 'contact':
        return (
          <div className={`${baseClasses} bg-purple-100 text-purple-600`}>
            📧
          </div>
        );
      case 'product':
        const productColor = status === 'warning' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600';
        return (
          <div className={`${baseClasses} ${productColor}`}>
            📋
          </div>
        );
      case 'system':
        return (
          <div className={`${baseClasses} bg-gray-100 text-gray-600`}>
            ⚙️
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-gray-100 text-gray-600`}>
            📊
          </div>
        );
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    const statusClasses: Record<string, string> = {
      success: 'bg-green-50 text-green-700 border-green-200',
      warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      error: 'bg-red-50 text-red-700 border-red-200',
      info: 'bg-blue-50 text-blue-700 border-blue-200'
    };

    const classes = statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200';

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${classes}`}>
        {status}
      </span>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          {showViewAll && onViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {displayedActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">📊</div>
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-start space-x-3">
                {/* Activity Icon */}
                <div className="flex-shrink-0">
                  {activity.user?.avatar ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    getActivityIcon(activity.type, activity.status)
                  )}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      
                      {/* Metadata */}
                      {activity.metadata && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <span
                              key={key}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600"
                            >
                              <span className="font-medium">{key}:</span>
                              <span className="ml-1">{String(value)}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Status and Timestamp */}
                    <div className="flex flex-col items-end space-y-1 ml-4">
                      {getStatusBadge(activity.status)}
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline connector */}
                {index < displayedActivities.length - 1 && (
                  <div className="absolute left-10 mt-8 w-px h-4 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      {activities.length > maxItems && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onViewAll}
            className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            Load more activities ({activities.length - maxItems} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
