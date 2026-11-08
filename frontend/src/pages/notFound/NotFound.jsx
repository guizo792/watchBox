import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center">
    <img src="/images/img404.png" alt="" className="w-full" />
    <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
    <p className="text-sm text-muted">
      The page you're looking for doesn't exist or has moved.
    </p>
    <Link to="/" className="btn-primary mt-2">
      Back to home
    </Link>
  </div>
);

export default NotFound;
