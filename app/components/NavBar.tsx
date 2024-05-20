import { auth } from "../lib/auth";
import LinkNav from "./LinkNav";
const navLinks = [
  {
    name: "Cabins",
    href: "/cabins",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Guest area",
    href: "/account",
  },
];
const NavBar = async () => {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {navLinks.slice(0, 2).map((link) => (
          <LinkNav link={link} />
        ))}
        {session?.user?.image ? (
          <LinkNav link={navLinks[2]}>
            <img
              src={session.user.image}
              alt={session.user.name||""}
              className=" h-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          </LinkNav>
        ) : (
          <LinkNav link={navLinks[2]} />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
