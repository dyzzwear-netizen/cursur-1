import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function createEmployee(data: FormData) {
  'use server';
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim() || null;
  const salaryCents = Math.round(Number(data.get('salary')) * 100);
  if (!name || !Number.isFinite(salaryCents) || salaryCents < 0) return;
  await prisma.employee.create({ data: { name, email, salary: salaryCents } });
  redirect('/employees');
}

export default function NewEmployeePage() {
  return (
    <form action={createEmployee} className="max-w-md grid gap-4">
      <h1 className="text-2xl font-semibold">Add Employee</h1>
      <label className="grid gap-1">
        <span className="text-sm">Name</span>
        <input name="name" required className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Email</span>
        <input name="email" type="email" className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Monthly Salary (e.g. 1200.00)</span>
        <input name="salary" type="number" step="0.01" min="0" required className="border rounded px-3 py-2" />
      </label>
      <div className="flex gap-2">
        <button className="border rounded px-4 py-2 bg-black text-white">Save</button>
        <a href="/employees" className="border rounded px-4 py-2">Cancel</a>
      </div>
    </form>
  );
}
