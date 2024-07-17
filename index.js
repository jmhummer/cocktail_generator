import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Home page
app.get("/", async (req, res) => {
    res.render("index.ejs");
})

app.get("/name", async (req, res) => {
    try {
        const result = await axios.get(API_URL + `search.php?s=${req.query.search}`);

        if (result.data.drinks == null) {
            res.render("index.ejs", { errorMsg: "Cocktail not found"});
        } else {
            res.render("index.ejs", { content: result.data.drinks});
        }
    } catch (error) {
        res.render("index.ejs", { errorMsg: "Cocktail search error"});
    }
});

app.get("/random", async (req, res) => {
    try {
        const result = await axios.get(API_URL + `random.php`);
        res.render("index.ejs", { content: result.data.drinks});
    } catch (error) {
        res.render("index.ejs", { errorMsg: "Random generator issue"});
    }
});
app.get("/ingredient", async (req, res) => {
    try {
        const result = await axios.get(API_URL + `search.php?i=${req.query.search}`);
        res.render("index.ejs", { ingredient: result.data.ingredients[0]});
    } catch (error) {
        res.render("index.ejs", { errorMsg: "Ingredient not found"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
