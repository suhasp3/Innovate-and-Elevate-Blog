import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [
  {
    title: "Surviving Your Freshman Year",
    content:
      "Starting college can be overwhelming, but with the right approach, it can also be an exciting adventure. Attend orientation to familiarize yourself with the campus and meet fellow students. When selecting courses, use websites like RateMyProfessor to try to find the best one for that specific class. Get involved in clubs to make friends and explore your interests. Remember, it's okay to ask for help from professors and advisors. Embrace the journey and make the most of your freshman year!",
  },

  {
    title: "Effective Study Techniques",
    content:
      "Effective study techniques can significantly enhance your learning experience. One powerful method is the Pomodoro Technique, which involves studying for 25 minutes followed by a 5-minute break. This approach helps maintain focus and prevent burnout. Additionally, actively engage with the material by summarizing it in your own words, teaching it to someone else, or applying it through practice exercises. Regular reviews and spaced repetition are also crucial for reinforcing knowledge over time. By incorporating these strategies, you can make your study sessions more productive and efficient.",
  },

  {
    title: "How to Create a Productive Home Office Environment",
    content:
      "Creating a productive home office environment is essential for maintaining focus and efficiency. Start by choosing a dedicated workspace that is comfortable and free from distractions. Invest in ergonomic furniture to support good posture and reduce physical strain. Ensure your workspace is well-lit and organized, with easy access to necessary supplies. Personalize your space with items that inspire and motivate you, but avoid clutter that can hinder productivity. Establish a routine to separate work from personal life and set clear boundaries. By optimizing your home office environment, you can enhance your work performance and overall well-being.",
  },
];


app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Get route for each blog post
app.get("/post/:index", (req, res) => {
  //uses index variable to get route for EACH specific post
  const index = req.params.index;
  const post = posts[index];
  res.render("post", { post: post, index: index });
});

//Get route for the edit pages
app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  const post = posts[index];
  res.render("edit.ejs", { post: post, index: index });
});

//Post route to create a new blog post
app.post("/new", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(post);
  res.redirect("/");
});

//Post route to edit a blog post
app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  posts[index] = {
    title: req.body.title,
    content: req.body.content,
  };
  res.redirect(`/post/${index}`);
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
