import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p className="cursor-pointer text-slate-300 hover:text-white">
        {item}
      </motion.p>

      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute left-1/2 top-full mt-4 -translate-x-1/2"
        >
          <div className="rounded-2xl bg-slate-900 border border-slate-700 shadow-xl p-4">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="flex gap-6 rounded-full bg-slate-900/80 backdrop-blur px-8 py-4 border border-slate-700"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      className="block text-sm text-slate-300 hover:text-white"
    >
      {children}
    </a>
  );
};
