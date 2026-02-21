import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import InstructionsPanel from "@/components/InstructionsPanel";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumb items={["Registration"]} />

      <main className="container mx-auto flex-1 px-6 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <InstructionsPanel />
          <RegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
