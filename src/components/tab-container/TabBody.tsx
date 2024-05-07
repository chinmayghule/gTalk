function TabBody({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow overflow overflow-y-scroll px-4 pb-4 pt-2">
      {children}
    </main>
  );
}

export default TabBody;
