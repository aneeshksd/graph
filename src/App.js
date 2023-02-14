import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import RecipeList from "./recipeList.json";
import Recipe_1 from "./recipe_1.json";
import Recipe_2 from "./recipe_2.json";
import Recipe_3 from "./recipe_3.json";
import { Radio } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import VisHierarchy from "./VisHierarchy";
import VisNormal from "./VisNormal";
import RecipeImage from "./Images/level1.png";
import StepImage from "./Images/steps.png";
import ActivityImage from "./Images/activity.png";
import ParameterImage from "./Images/parameter.png";

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(""); //set the variable for DropDown
  const [recipeList, setRecipeList] = useState([]); //set the variable for Recipe list
  const [mode, setMode] = useState("hierarchy"); //setting the variable for for view
  const [selectedRecipeData, setSelectedRecipeData] = useState(); //set the variable for the recipe data

  useEffect(() => {
    if (RecipeList && RecipeList.data && RecipeList.data.recipeList) {
      setRecipeList(RecipeList.data.recipeList);
    }
  }, []); //onload of the page, setting the recipeList

  useEffect(() => {
    loadRecipeData(selectedRecipe);
  }, [selectedRecipe]); //on change of recipe loadRecipeData function will call

  const bg_color = {
    backgroundColor: "#e3f2fd", //background color for navigation
  };

  /**
   * used for updating the mode (hierarchy and normal) data
   *    * @param {*} e event data
   */
  const onModeChange = (e) => {
    //mode change of graph
    setMode(e.target.value);
    if (selectedRecipe) {
      loadRecipeData(selectedRecipe);
    }
  };

  const onRecipeDropDownChange = (e) => {
    //onChange function for selecting recipe
    setSelectedRecipe(e.target.value);
  };

  /**
   * To load the recipe data based on the recipe selection
   * @param {*} selectedRecipe selected recipe ID
   */
  const loadRecipeData = (selectedRecipe) => {
    //loading recipe data from JSON
    switch (selectedRecipe) {
      case "recipe_1":
        setSelectedRecipeData({ ...Recipe_1 });
        break;
      case "recipe_2":
        setSelectedRecipeData({ ...Recipe_2 });
        break;
      case "recipe_3":
        setSelectedRecipeData({ ...Recipe_3 });
        break;
      default:
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light" style={bg_color}>
        <a className="navbar-brand">Recipe Visualization</a>
      </nav>
      <div className="row p-4">
        <div className="col">
          {/* DropDown Button for recipe change */}
          <select
            className="form-select w-50"
            onChange={(e) => onRecipeDropDownChange(e)}
          >
            <option value="recipe_1" key={0}>
              Select Recipe
            </option>
            {recipeList &&
              recipeList.map((item, index) => {
                return (
                  <option value={item.value} key={index + 1}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col">
          Mode:&nbsp;&nbsp;
          {/* Radio Button for selecting the mode */}
          <Radio.Group onChange={onModeChange} value={mode}>
            <Radio value={"hierarchy"} key={1}>
              Hierarchy
            </Radio>
            <Radio value={"normal"} key={2}>
              Normal
            </Radio>
          </Radio.Group>
        </div>

        <div className="col">
          <div className="d-flex">
            <div className="legend_recipe recipe-color">
              {/* Recipe Legends*/}
              <img
                src={RecipeImage}
                style={{ width: "20px", height: "20px", paddingBottom: "7px" }}
              ></img>
            </div>
            <p className="rep me-2"> Recipe</p>
            <div className="legend_steps step-color">
              <img
                src={StepImage}
                style={{ width: "20px", height: "20px", paddingBottom: "7px" }}
              ></img>
            </div>
            <p id="demo" className="rep me-2">
              {" "}
              Steps
            </p>
            <div className="legend_activity activity-color">
              <img
                src={ActivityImage}
                style={{
                  width: "20px",
                  height: "20px",
                  paddingBottom: "7px",
                  paddingLeft: "8px",
                }}
              ></img>
            </div>
            <p className="rep me-2">Activities</p>
            <div className="legend_parameter parameter-color">
              <img
                src={ParameterImage}
                style={{
                  width: "20px",
                  height: "20px",
                  paddingBottom: "7px",
                  paddingLeft: "10px",
                }}
              ></img>
            </div>
            <p className="rep me-2">Parameter</p>
          </div>
        </div>

        <div>
          {mode === "hierarchy" && selectedRecipeData && (
            <VisHierarchy Data={selectedRecipeData} /> //passing data to VisHierarchy
          )}
          {mode === "normal" && selectedRecipeData && (
            <VisNormal Data={selectedRecipeData} /> //passing data to VisNormal
          )}
        </div>
      </div>
    </div>
  );
}
