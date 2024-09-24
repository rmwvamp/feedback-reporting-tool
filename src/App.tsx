import Button from "@mui/material/Button";
import FeedbackButton from "./FeedbackButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Image1 from "./ArchivedComponents/Image1";
import React, { useState, useRef, ReactElement } from "react";

import TextField from "@mui/material/TextField";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <header style={headerStyle}>
        <h1>Welcome to My React TypeScript Website</h1>
      </header>
      <main style={mainStyle}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{
            height: "10rem", // Increased height
            width: "30rem", // Decreased width
            minWidth: "40px", // Ensure the width is not expanded by
          }}
        />

        <img
          src="https://govisually.com/wp-content/uploads/2023/02/5-features-to-look-for-in-a-great-design-feedback-tool-1024x1024.png"
          alt="Placeholder"
          style={imageStyle}
        />
        <p>
          Fusce nec scelerisque nunc. Donec quis leo ac metus dictum posuere.
          Mauris in tortor ac turpis consequat eleifend. Mauris id justo massa.
          Suspendisse potenti. Ut in semper nulla. Nullam a bibendum lectus.
          Donec consequat est non posuere consequat. Proin at metus sed sem
          laoreet cursus. Nam et tellus eleifend, tincidunt elit ac, fermentum
          dolor.
        </p>
        {/* <img src="https://via.placeholder.com/400" alt="Placeholder" style={imageStyle} /> */}
        <h2>About Us2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us3</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us4</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us5</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us6</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us7</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us8</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us9</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us10</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us11</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
        <h2>About Us12</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vehicula eros et justo aliquam, at pellentesque leo tincidunt. Donec
          eleifend purus sit amet tortor luctus, vel molestie nulla egestas.
          Nulla facilisi. Cras auctor, velit non tincidunt dapibus, nisi dolor
          sollicitudin ex, sit amet eleifend tortor magna vitae leo. Sed vel
          arcu non odio ultrices venenatis.
        </p>
      </main>
      <FeedbackButton />
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#282c34",
  padding: "20px",
  color: "white",
};

const mainStyle: React.CSSProperties = {
  padding: "20px",
};

const imageStyle: React.CSSProperties = {
  maxWidth: "100%",
  margin: "20px 0",
};

export default App;
