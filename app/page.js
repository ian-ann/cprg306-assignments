import Link from "next/link";

export default function Home() {

  let linkStyles = "underline text-cyan-600 hover:bg-cyan-300";

  return (
    <main>
      <h1>Home</h1>
          <Link className={linkStyles} href="./week-2/">Week 2 - New Next JS Project</Link><br></br>
          <Link className={linkStyles} href="./week-3/">Week 3 - Objects & Props</Link><br></br>
    </main>
  );
}
