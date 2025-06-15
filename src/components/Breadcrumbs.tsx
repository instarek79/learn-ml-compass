
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/', icon: <Home className="w-4 h-4" /> }
    ];

    switch (path) {
      case '/learn':
        breadcrumbs.push({ label: 'Learn AI', path: '/learn' });
        break;
      case '/code':
        breadcrumbs.push({ label: 'Coding Area', path: '/code' });
        break;
      case '/datasets':
        breadcrumbs.push({ label: 'Datasets', path: '/datasets' });
        break;
      case '/models':
        breadcrumbs.push({ label: 'ML Models', path: '/models' });
        break;
      case '/training':
        breadcrumbs.push({ label: 'Training', path: '/training' });
        break;
      case '/progress':
        breadcrumbs.push({ label: 'Progress', path: '/progress' });
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="flex items-center space-x-1 text-white">
              {crumb.icon}
              <span>{crumb.label}</span>
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
            >
              {crumb.icon}
              <span>{crumb.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
