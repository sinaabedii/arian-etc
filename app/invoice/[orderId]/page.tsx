'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface InvoiceItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceData {
  orderNumber: string;
  orderDate: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: string;
}

export default function InvoicePage() {
  const params = useParams();
  const orderId = params.orderId as string;

  // Mock invoice data - در واقعیت از API دریافت می‌شود
  const invoiceData: InvoiceData = {
    orderNumber: orderId || 'ORD-123456789',
    orderDate: '1403/11/05',
    customerInfo: {
      name: 'علی احمدی',
      email: 'ali.ahmadi@example.com',
      phone: '09123456789',
      address: 'تهران، خیابان ولیعصر، پلاک 123، واحد 45'
    },
    items: [
      {
        id: '1',
        name: 'ضدعفونی‌کننده اولتراکلین',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        quantity: 2,
        price: 250000,
        total: 500000
      },
      {
        id: '2',
        name: 'پاک‌کننده کف حرفه‌ای',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        quantity: 1,
        price: 190000,
        total: 190000
      },
      {
        id: '3',
        name: 'دستمال مرطوب ضدباکتری',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        quantity: 3,
        price: 85000,
        total: 255000
      }
    ],
    subtotal: 945000,
    shipping: 0,
    tax: 94500,
    total: 1039500,
    paymentMethod: 'پرداخت آنلاین',
    status: 'پرداخت شده'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // در واقعیت باید PDF تولید شود
    alert('دانلود PDF - این قابلیت در نسخه نهایی پیاده‌سازی خواهد شد');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8 print:hidden">
            <Link href="/dashboard">
              <Button variant="outline">
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                بازگشت به داشبورد
              </Button>
            </Link>
            
            <div className="flex space-x-3 space-x-reverse">
              <Button variant="outline" onClick={handlePrint}>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                چاپ
              </Button>
              
              <Button onClick={handleDownloadPDF}>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                دانلود PDF
              </Button>
            </div>
          </div>

          {/* Invoice Card */}
          <Card className="p-8 lg:p-12">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-800">
                      Arian ETC
                    </h1>
                    <p className="text-neutral-600">محصولات نظافتی و ضدعفونی</p>
                  </div>
                </div>
                
                <div className="text-sm text-neutral-600 space-y-1">
                  <p>تهران، خیابان آزادی، پلاک 456</p>
                  <p>تلفن: 021-12345678</p>
                  <p>ایمیل: info@arianetc.com</p>
                  <p>وب‌سایت: www.arianetc.com</p>
                </div>
              </div>
              
              <div className="text-left">
                <h2 className="text-3xl font-display font-bold text-primary-600 mb-2">
                  فاکتور فروش
                </h2>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p><span className="font-medium">شماره سفارش:</span> {invoiceData.orderNumber}</p>
                  <p><span className="font-medium">تاریخ سفارش:</span> {invoiceData.orderDate}</p>
                  <p><span className="font-medium">وضعیت:</span> 
                    <span className="inline-block mr-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {invoiceData.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">اطلاعات مشتری:</h3>
              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium text-neutral-800">{invoiceData.customerInfo.name}</p>
                    <p className="text-neutral-600">{invoiceData.customerInfo.email}</p>
                    <p className="text-neutral-600">{invoiceData.customerInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">آدرس تحویل:</p>
                    <p className="text-neutral-800">{invoiceData.customerInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">جزئیات سفارش:</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-right py-4 px-2 font-semibold text-neutral-800">محصول</th>
                      <th className="text-center py-4 px-2 font-semibold text-neutral-800">تعداد</th>
                      <th className="text-center py-4 px-2 font-semibold text-neutral-800">قیمت واحد</th>
                      <th className="text-center py-4 px-2 font-semibold text-neutral-800">جمع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item) => (
                      <tr key={item.id} className="border-b border-neutral-100">
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="relative w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium text-neutral-800">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center">{item.quantity}</td>
                        <td className="py-4 px-2 text-center">{formatPrice(item.price)}</td>
                        <td className="py-4 px-2 text-center font-medium">{formatPrice(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
              <div className="w-full max-w-sm">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">جمع محصولات:</span>
                    <span className="font-medium">{formatPrice(invoiceData.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">هزینه ارسال:</span>
                    <span className="font-medium">
                      {invoiceData.shipping === 0 ? (
                        <span className="text-green-600">رایگان</span>
                      ) : (
                        formatPrice(invoiceData.shipping)
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">مالیات (10%):</span>
                    <span className="font-medium">{formatPrice(invoiceData.tax)}</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>مبلغ نهایی:</span>
                      <span className="text-primary-600">{formatPrice(invoiceData.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">اطلاعات پرداخت:</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-green-800">پرداخت با موفقیت انجام شد</p>
                    <p className="text-sm text-green-700">روش پرداخت: {invoiceData.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">شرایط و ضوابط:</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• کلیه محصولات دارای 6 ماه گارانتی می‌باشند</li>
                    <li>• امکان مرجوعی کالا تا 7 روز پس از خرید</li>
                    <li>• هزینه ارسال برای سفارش‌های بالای 500 هزار تومان رایگان است</li>
                    <li>• پشتیبانی 24 ساعته در خدمت شما عزیزان</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">تماس با ما:</h4>
                  <div className="text-sm text-neutral-600 space-y-1">
                    <p>📞 تلفن پشتیبانی: 021-12345678</p>
                    <p>📧 ایمیل: support@arianetc.com</p>
                    <p>🌐 وب‌سایت: www.arianetc.com</p>
                    <p>📱 واتساپ: 09123456789</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500">
                  از اعتماد شما متشکریم | Arian ETC - کیفیت در خدمت سلامت
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
