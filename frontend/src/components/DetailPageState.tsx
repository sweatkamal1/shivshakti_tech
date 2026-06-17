import { Link } from "react-router-dom";

interface DetailStateProps {
  loading: boolean;
  notFound: boolean;
  backTo: string;
  backLabel: string;
}

export function DetailPageState({ loading, notFound, backTo, backLabel }: DetailStateProps) {
  if (loading) {
    return <div className="px-4 py-24 text-center text-slate-500">Loading...</div>;
  }

  if (notFound) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-lg font-semibold text-slate-900">Not found</p>
        <p className="mt-2 text-slate-500">This content is unavailable or may have been removed.</p>
        <Link to={backTo} className="mt-6 inline-block text-sm font-medium text-brand hover:underline">
          ← {backLabel}
        </Link>
      </div>
    );
  }

  return null;
}
