import Graph from "react-graph-vis";
import React, { useEffect, useState } from "react";
import "../node_modules/vis-network/dist/dist/vis-network.css";
import RecipeImage from "./Images/level1.png";
import StepImage from "./Images/steps.png";
import ActivityImage from "./Images/level3.png";
import ParameterImage from "./Images/level4.png";

const VisHierarchy = ({ Data }) => {
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
      generateGraphData(Data);
    }, 1000);
  }, [Data]);

  /**
   * To generate graph in hierarchical view for selected recipe
   * @param {*} recipeDetails selected recipe details
   */

  const generateGraphData = (recipeDetails) => {
    const nodes = []; //initializing nodes
    const edges = []; //initializing edges
    var i = 1;
    nodes.push({
      id: i,
      label: recipeDetails?.data?.recipe?.name,
      level: 1,
      imagePadding: { left: 0, top: 0, right: 0, bottom: 0 },
      color: "#f298a1",
      shape: "image",
      image: RecipeImage,
      title: recipeDetails?.data?.recipe?.name,
      size: 200,
    });

    var recipeId = i;
    recipeDetails?.data?.recipe?.values.map((processItem) => {
      processItem.values.map((stepItem) => {
        i += 1;
        nodes.push({
          // inserting object to node
          id: i,
          label: stepItem.name,
          level: 2,
          color: "rgb(188 191 238)",
          shape: "circularImage",
          borderRadius: 0,
          size: 200,
          font: { size: 50, color: "black" },
          image: StepImage,
          title: stepItem._order,
          imagePadding: { top: 50, left: 50, right: 50, bottom: 50 },
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
            size: 200,
            font: { size: 50, color: "black" },
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
              size: 150,
              font: { size: 50, color: "black" },
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

  /**
   * For hierarchical view
   */
  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 700,
        nodeSpacing: 800,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: "UD", // UD, DU, LR, RL
      },
    },

    physics: false,
    interaction: {
      dragNodes: true,
      selectable: true,
      navigationButtons: true,
      keyboard: true,
      hover: true,
      zoomSpeed: 5,
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
export default VisHierarchy;
