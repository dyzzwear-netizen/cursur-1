import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

async function updateEmployee(id: string, data: FormData) {
  'use server';
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim() || null;
  const salaryCents = Math.round(Number(data.get('salary')) * 100);
  if (!name || !Number.isFinite(salaryCents) || salaryCents < 0) return;
  await prisma.employee.update({ where: { id }, data: { name, email, salary: salaryCents } });
  redirect('/employees');
}

async function removeEmployee(id: string) {
  'use server';
  await prisma.employee.delete({ where: { id } });
  redirect('/employees');
}

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({ where: { id: params.id } });
  if (!employee) return notFound();
  return (
    <form action={updateEmployee.bind(null, employee.id)} className="max-w-md grid gap-4">
      <h1 className="text-2xl font-semibold">Edit Employee</h1>
      <label className="grid gap-1">
        <span className="text-sm">Name</span>
        <input name="name" defaultValue={employee.name} required className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Email</span>
        <input name="email" type="email" defaultValue={employee.email ?? ''} className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Monthly Salary</span>
        <input name="salary" type="number" step="0.01" min="0" defaultValue={(employee.salary / 100).toFixed(2)} required className="border rounded px-3 py-2" />
      </label>
      <div className="flex gap-2">
        <button className="border rounded px-4 py-2 bg-black text-white">Save</button>
        <form action={removeEmployee.bind(null, employee.id)}>
          <button className="border rounded px-4 py-2 text-red-600" formAction={removeEmployee.bind(null, employee.id)}>Delete</button>
        </form>
        <a href="/employees" className="border rounded px-4 py-2">Cancel</a>
      </div>
    </form>
  );
}
