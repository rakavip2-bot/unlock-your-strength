import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: string[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="container mx-auto px-6 py-3">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={index === items.length - 1 ? "font-medium text-foreground" : ""}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
