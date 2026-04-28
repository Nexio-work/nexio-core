import { json, type LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";

type Company = {
  id: string;
  name: string;
  seats: number;
  used_seats: number;
};

export const loader: LoaderFunction = async ({ context }) => {
  const { DB } = context.cloudflare.env as { DB: D1Database };
  const { results } = await DB.prepare(
    "SELECT id, name, seats, used_seats FROM companies LIMIT 50"
  ).all();
  return json(results);
};

export default function DashboardB2B() {
  const companies = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
       <h1>Dashboard B2B — Nexio.work</h1>
      <Link to="/companies/new" style={{ padding: 8, background: "#000", color: "#fff", textDecoration: "none" }}>
        + Nouvelle entreprise
      </Link>
      <table style={{ width: "100%", marginTop: 24, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th align="left">Entreprise</th>
            <th>Seats total</th>
            <th>Seats utilisés</th>
            <th>Disponibles</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c: Company) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{c.name}</td>
              <td align="center">{c.seats}</td>
              <td align="center">{c.used_seats}</td>
              <td align="center">{c.seats - c.used_seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
