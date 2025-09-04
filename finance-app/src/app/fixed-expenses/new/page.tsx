import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function createExpense(data: FormData) {
  'use server';
  const name = String(data.get('name') || '').trim();
  const category = String(data.get('category') || '').trim() || 'general';
  const isRecurring = String(data.get('recurring') || 'yes') === 'yes';
  const amountCents = Math.round(Number(data.get('amount')) * 100);
  if (!name || !Number.isFinite(amountCents) || amountCents < 0) return;
  await prisma.fixedExpense.create({ data: { name, category, isRecurring, amount: amountCents } });
  redirect('/fixed-expenses');
}

export default function NewExpensePage() {
  return (
    <form action={createExpense} className="max-w-md grid gap-4">
      <h1 className="text-2xl font-semibold">Add Fixed Expense</h1>
      <label className="grid gap-1">
        <span className="text-sm">Name</span>
        <input name="name" required className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Category</span>
        <input name="category" className="border rounded px-3 py-2" defaultValue="general" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Recurring</span>
        <select name="recurring" className="border rounded px-3 py-2">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Monthly Amount (e.g. 300.00)</span>
        <input name="amount" type="number" step="0.01" min="0" required className="border rounded px-3 py-2" />
      </label>
      <div className="flex gap-2">
        <button className="border rounded px-4 py-2 bg-black text-white">Save</button>
        <a href="/fixed-expenses" className="border rounded px-4 py-2">Cancel</a>
      </div>
    </form>
  );
}
