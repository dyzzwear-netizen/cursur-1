import { prisma } from '@/lib/prisma';
import Link from 'next/link';

function formatCents(value: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value / 100);
}

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({ orderBy: { name: 'asc' } });
  const total = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Link href="/employees/new" className="border rounded px-3 py-2 hover:bg-gray-50">Add Employee</Link>
      </div>
      <div className="text-sm text-gray-600">Monthly total: {formatCents(total)}</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-right">Salary</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-2">{e.name}</td>
                <td className="p-2">{e.email ?? '-'}</td>
                <td className="p-2 text-right">{formatCents(e.salary)}</td>
                <td className="p-2 text-right">
                  <Link href={`/employees/${e.id}`} className="text-blue-600">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
