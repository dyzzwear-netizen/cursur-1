import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

async function updateExpense(id: string, data: FormData) {
  'use server';
  const name = String(data.get('name') || '').trim();
  const category = String(data.get('category') || '').trim() || 'general';
  const isRecurring = String(data.get('recurring') || 'yes') === 'yes';
  const amountCents = Math.round(Number(data.get('amount')) * 100);
  if (!name || !Number.isFinite(amountCents) || amountCents < 0) return;
  await prisma.fixedExpense.update({ where: { id }, data: { name, category, isRecurring, amount: amountCents } });
  redirect('/fixed-expenses');
}

async function removeExpense(id: string) {
  'use server';
  await prisma.fixedExpense.delete({ where: { id } });
  redirect('/fixed-expenses');
}

export default async function EditExpensePage({ params }: { params: { id: string } }) {
  const expense = await prisma.fixedExpense.findUnique({ where: { id: params.id } });
  if (!expense) return notFound();
  return (
    <form action={updateExpense.bind(null, expense.id)} className="max-w-md grid gap-4">
      <h1 className="text-2xl font-semibold">Edit Fixed Expense</h1>
      <label className="grid gap-1">
        <span className="text-sm">Name</span>
        <input name="name" defaultValue={expense.name} required className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Category</span>
        <input name="category" defaultValue={expense.category} className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Recurring</span>
        <select name="recurring" defaultValue={expense.isRecurring ? 'yes' : 'no'} className="border rounded px-3 py-2">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Monthly Amount</span>
        <input name="amount" type="number" step="0.01" min="0" defaultValue={(expense.amount / 100).toFixed(2)} required className="border rounded px-3 py-2" />
      </label>
      <div className="flex gap-2">
        <button className="border rounded px-4 py-2 bg-black text-white">Save</button>
        <form action={removeExpense.bind(null, expense.id)}>
          <button className="border rounded px-4 py-2 text-red-600" formAction={removeExpense.bind(null, expense.id)}>Delete</button>
        </form>
        <a href="/fixed-expenses" className="border rounded px-4 py-2">Cancel</a>
      </div>
    </form>
  );
}
