import Link from "next/link";

export default function Home() {

  let linkStyles = "underline text-cyan-600 hover:bg-cyan-300";

  return (
    <main>
      <h1>Home</h1>
          <Link className={linkStyles} href="./week-2/">Week 2 - New Next JS Project</Link><br></br>
          <Link className={linkStyles} href="./week-3/">Week 3 - Objects & Props</Link><br></br>
          <Link className={linkStyles} href="./week-4/">Week 4 - Basic Interactivity</Link><br></br>
          <Link className={linkStyles} href="./week-5/">Week 5 - Form Submissions</Link><br></br>
          <Link className={linkStyles} href="./week-6/">Week 6 - sorting functionality</Link><br></br>
    </main>
  );
}
