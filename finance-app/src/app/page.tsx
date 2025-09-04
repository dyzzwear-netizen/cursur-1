export default function Page() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="/employees" className="border rounded p-4 hover:shadow-sm">
          <div className="text-sm text-gray-500">People</div>
          <div className="font-medium">Employees & Salaries</div>
        </a>
        <a href="/fixed-expenses" className="border rounded p-4 hover:shadow-sm">
          <div className="text-sm text-gray-500">Costs</div>
          <div className="font-medium">Fixed Expenses</div>
        </a>
        <a href="#" className="border rounded p-4 opacity-70 cursor-not-allowed">
          <div className="text-sm text-gray-500">Coming soon</div>
          <div className="font-medium">Reports & Sheets</div>
        </a>
      </div>
    </div>
  );
}
