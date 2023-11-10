// constants
import { SITE_NAME } from "@/constants";

// footer
const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        {/* copyright text */}
        <p className="text-center text-xs text-black">
          &copy; {new Date().getFullYear()}-
          {(new Date().getFullYear() % 100) + 1} {SITE_NAME} | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
