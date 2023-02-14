import Graph from "react-graph-vis";
import React, { useEffect, useState } from "react";
import "../node_modules/vis-network/dist/dist/vis-network.css";
import RecipeImage from "./Images/level1.png";
import StepImage from "./Images/steps.png";
import ActivityImage from "./Images/level3.png";
import ParameterImage from "./Images/level4.png";

const VisNormal = ({ Data }) => {
  const [graphData, setGraphData] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    setGraphData({
      nodes: [],
      edges: [],
    });
    setTimeout(() => {
      generateGraphData(Data); //function call with setTime of 1 millie second
    }, 1000);
  }, [Data]);

  /**
   * To generate graph in normal view for selected recipe
   * @param {*} recipeDetails selected recipe details
   */

  const generateGraphData = (recipeDetails) => {
    const nodes = [];
    const edges = [];
    var i = 1;
    nodes.push({
      id: i,
      label: recipeDetails?.data?.recipe?.name,
      level: 1,
      color: "#f298a1",
      shape: "image",
      image: RecipeImage,
      title: recipeDetails?.data?.recipe?.name,
    });

    var recipeId = i;
    recipeDetails?.data?.recipe?.values.map((processItem) => {
      processItem?.values.map((stepItem) => {
        i += 1;
        nodes.push({
          id: i,
          label: stepItem.name,
          level: 2,
          color: "rgb(188 191 238)",
          shape: "circularImage",
          image: StepImage,
          title: stepItem._order,
          imagePadding: { top: 10, left: 10, right: 10, bottom: 10 },
        });
        edges.push({
          from: recipeId,
          to: i,
        });
        const stepId = i;
        stepItem?.valueObj?.activities.map((activityItem) => {
          i += 1;
          nodes.push({
            id: i,
            label: activityItem.name,
            level: 3,
            shape: "image",
            image: ActivityImage,
            title: activityItem.type,
          });
          edges.push({
            from: stepId,
            to: i,
          });
          const activityId = i;
          activityItem?.valueObj?.parameters.map((parameterItem) => {
            i += 1;
            nodes.push({
              id: i,
              label: parameterItem.name,
              level: 4,
              color: " #ffdb6f",
              shape: "image",
              image: ParameterImage,
              title: parameterItem.fieldNames,
            });
            edges.push({
              from: activityId,
              to: i,
            });
          });
        });
      });
    });
    setGraphData({ ...graphData, nodes, edges });
  };
  const options = {
    layout: {
      randomSeed: 100,
      improvedLayout: false,
    },
    edges: {
      smooth: {
        forceDirection: "none",
      },
    },
    physics: {
      minVelocity: 1,
    },
    interaction: {
      dragNodes: true,
      selectable: true,
      navigationButtons: true,
      keyboard: true,
    },
  };

  return (
    <div>
      {/* react graph view*/}
      {graphData?.nodes?.length > 0 && (
        <Graph
          graph={graphData}
          options={options}
          style={{ height: "590px" }}
        />
      )}
    </div>
  );
};
export default VisNormal;
