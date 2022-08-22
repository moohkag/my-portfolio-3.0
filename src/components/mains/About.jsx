import Skills from "../subs/Skills";
import { useContext } from "react";
import { NavContext } from "../App";

const About = () => {
  const navRefs = useContext(NavContext);

  return (
    <div className="main" id="about" ref={navRefs[1]}>
      <div className="about-me">
        <h1 className="about-me-h">About Me</h1>

        <p className="about-me-p">
          Hello, I am a web developer based in Winnipeg, MB Canada. Initially, I
          studied aviation in Providence UC. However, I felt that it was not for
          me. I dropped out of the school during Covid time and looked for
          different career path. Then I came across with Computer Science. I
          enrolled into a certificate program, Software Development, offered by
          Red River College. I learned general computer science, relational
          database (SQL) and Java. During the learning, I found my interest in
          Web Development. So, I continued studying on that field on my own. I'm
          looking forward to make the leap and continue refining my skills with
          the right company.
        </p>

        <p className="about-me-p">
          Other than coding, I spend most of my time playing CSGO and LOL. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Cumque, ducimus.
        </p>
      </div>

      <Skills />
    </div>
  );
};

export default About;