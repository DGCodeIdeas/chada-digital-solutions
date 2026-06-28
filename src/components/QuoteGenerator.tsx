import React, { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toaster, toast } from 'sonner';

const currencies = [
  { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
];

const quoteSchema = z.object({
  sender: z.object({
    name: z.string().min(2, 'Business name is required'),
    email: z.string().email('Invalid email'),
    address: z.string().min(5, 'Address is required'),
    logo: z.string().optional(),
  }),
  client: z.object({
    name: z.string().min(2, 'Client name is required'),
    email: z.string().email('Invalid email'),
    address: z.string().min(5, 'Address is required'),
  }),
  details: z.object({
    number: z.string().min(1, 'Quote number is required'),
    date: z.string(),
    dueDate: z.string(),
    currency: z.string().default('NGN'),
  }),
  items: z.array(z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().min(1),
    rate: z.number().min(0),
  })).min(1, 'At least one item is required'),
  tax: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  notes: z.string().optional(),
});

type QuoteData = z.infer<typeof quoteSchema>;

const defaultValues: QuoteData = {
  sender: { name: '', email: '', address: '', logo: '' },
  client: { name: '', email: '', address: '' },
  details: {
    number: 'QT-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'NGN',
  },
  items: [{ description: '', quantity: 1, rate: 0 }],
  tax: 0,
  discount: 0,
  notes: 'Thank you for your business!',
};

export default function QuoteGenerator() {
  const [isPreview, setIsPreview] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch('items');
  const watchedTax = watch('tax');
  const watchedDiscount = watch('discount');
  const watchedCurrency = watch('details.currency');
  const watchedSender = watch('sender');
  const watchedClient = watch('client');
  const watchedDetails = watch('details');
  const watchedNotes = watch('notes');

  const currencySymbol = currencies.find(c => c.code === watchedCurrency)?.symbol || '₦';

  const subtotal = watchedItems.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const taxAmount = (subtotal * watchedTax) / 100;
  const discountAmount = (subtotal * watchedDiscount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(atob(dataParam)));
        reset(decodedData);
        if (decodedData.sender.logo) setLogoPreview(decodedData.sender.logo);
        setIsPreview(true);
      } catch (e) {
        console.error('Failed to decode quote data', e);
      }
    }
  }, [reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        setValue('sender.logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onShare = () => {
    const data = watch();
    const encodedData = btoa(encodeURIComponent(JSON.stringify(data)));
    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  const onPrint = () => {
    window.print();
  };

  const onSubmit = (data: QuoteData) => {
    setIsPreview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isPreview) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center no-print">
          <button
            onClick={() => setIsPreview(false)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Edit Quote
          </button>
          <div className="flex gap-3">
            <button onClick={onShare} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
              Share Link
            </button>
            <button onClick={onPrint} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Print / Save PDF
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm md:p-12 print:border-none print:shadow-none print:p-0">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-16 w-auto mb-6 object-contain" />
              ) : (
                <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 no-print">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              )}
              <h2 className="text-2xl font-bold">{watchedSender.name}</h2>
              <p className="text-slate-500 whitespace-pre-line">{watchedSender.address}</p>
              <p className="text-slate-500">{watchedSender.email}</p>
            </div>
            <div className="text-left md:text-right">
              <h1 className="text-4xl font-bold tracking-tight text-primary uppercase mb-4">Quotation</h1>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:block">
                <p><span className="font-bold text-slate-400 uppercase text-xs tracking-wider mr-2">Quote #</span> {watchedDetails.number}</p>
                <p><span className="font-bold text-slate-400 uppercase text-xs tracking-wider mr-2">Date</span> {watchedDetails.date}</p>
                <p><span className="font-bold text-slate-400 uppercase text-xs tracking-wider mr-2">Due Date</span> {watchedDetails.dueDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-12">
            <div>
              <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-3">Bill To</h3>
              <p className="text-lg font-bold">{watchedClient.name}</p>
              <p className="text-slate-500 whitespace-pre-line">{watchedClient.address}</p>
              <p className="text-slate-500">{watchedClient.email}</p>
            </div>
          </div>

          <div className="mt-12 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Description</th>
                  <th className="py-4 px-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-center">Qty</th>
                  <th className="py-4 px-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-right">Rate</th>
                  <th className="py-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {watchedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-5 align-top font-medium">{item.description}</td>
                    <td className="py-5 px-4 align-top text-center">{item.quantity}</td>
                    <td className="py-5 px-4 align-top text-right">{currencySymbol}{item.rate.toLocaleString()}</td>
                    <td className="py-5 align-top text-right font-semibold">{currencySymbol}{(item.quantity * item.rate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-md">
              {watchedNotes && (
                <>
                  <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-2">Notes & Terms</h3>
                  <p className="text-sm text-slate-500 whitespace-pre-line">{watchedNotes}</p>
                </>
              )}
            </div>
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{currencySymbol}{subtotal.toLocaleString()}</span>
              </div>
              {watchedTax > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Tax ({watchedTax}%)</span>
                  <span>{currencySymbol}{taxAmount.toLocaleString()}</span>
                </div>
              )}
              {watchedDiscount > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Discount ({watchedDiscount}%)</span>
                  <span>-{currencySymbol}{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-3 text-xl font-bold text-primary">
                <span>Total</span>
                <span>{currencySymbol}{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs text-slate-400 italic">This is a computer generated quotation.</p>
            <div className="flex items-center gap-1 opacity-50 grayscale hover:opacity-100 transition-all cursor-default">
              <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Powered by</span>
              <span className="text-xs font-black tracking-tight text-slate-900">CHADA<span className="text-primary">DIGITAL</span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Sender Details */}
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold">Your Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Logo (Optional)</label>
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg border border-dashed border-border bg-background flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Preview" className="size-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <input
                  {...register('sender.name')}
                  placeholder="Business Name"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.sender?.name && <p className="mt-1 text-xs text-red-500">{errors.sender.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('sender.email')}
                  placeholder="Email Address"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.sender?.email && <p className="mt-1 text-xs text-red-500">{errors.sender.email.message}</p>}
              </div>
              <div>
                <textarea
                  {...register('sender.address')}
                  placeholder="Business Address"
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.sender?.address && <p className="mt-1 text-xs text-red-500">{errors.sender.address.message}</p>}
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold">Client Details</h3>
            <div className="space-y-4">
              <div>
                <input
                  {...register('client.name')}
                  placeholder="Client / Company Name"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.client?.name && <p className="mt-1 text-xs text-red-500">{errors.client.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('client.email')}
                  placeholder="Client Email"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.client?.email && <p className="mt-1 text-xs text-red-500">{errors.client.email.message}</p>}
              </div>
              <div>
                <textarea
                  {...register('client.address')}
                  placeholder="Client Address"
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.client?.address && <p className="mt-1 text-xs text-red-500">{errors.client.address.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Quote Details */}
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-bold">Quote Details</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wider">Quote Number</label>
              <input
                {...register('details.number')}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wider">Date</label>
              <input
                type="date"
                {...register('details.date')}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wider">Due Date</label>
              <input
                type="date"
                {...register('details.dueDate')}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wider">Currency</label>
              <select
                {...register('details.currency')}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-lg font-bold">Items</h3>
            <button
              type="button"
              onClick={() => append({ description: '', quantity: 1, rate: 0 })}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-2">
              <div className="col-span-7 text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</div>
              <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Qty</div>
              <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Rate</div>
              <div className="col-span-1"></div>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center bg-background/50 p-4 rounded-xl border border-border/50 lg:bg-transparent lg:p-0 lg:border-0 lg:rounded-none">
                <div className="lg:col-span-7">
                  <input
                    {...register(`items.${index}.description` as const)}
                    placeholder="Description of service or product"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 lg:col-span-4">
                  <input
                    type="number"
                    {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                    placeholder="Qty"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{currencySymbol}</span>
                    <input
                      type="number"
                      {...register(`items.${index}.rate` as const, { valueAsNumber: true })}
                      placeholder="Rate"
                      className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="lg:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    disabled={fields.length === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals & Notes */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold">Notes & Terms</h3>
            <textarea
              {...register('notes')}
              placeholder="Additional notes, payment terms, etc."
              rows={6}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{currencySymbol}{subtotal.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wider">Tax (%)</label>
                  <input
                    type="number"
                    {...register('tax', { valueAsNumber: true })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block text-muted-foreground uppercase tracking-wider">Discount (%)</label>
                  <input
                    type="number"
                    {...register('discount', { valueAsNumber: true })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="text-base font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">{currencySymbol}{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="rounded-full bg-primary px-12 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
          >
            Preview Quotation
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
}
