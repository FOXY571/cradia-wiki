<template>
<main>
  <div class="background"></div>

  <div class="logo">
    <a href="?entry=home" title="Visit the main page"></a>
  </div>

  <div class="content-wrapper">
    <div class="panels">
      <div class="panel wiki-content main-border">
        <p class="panel-label">Navigation</p>
        <ul class="panel-list">
          <li>
            <a class="panel-link" href="?entry=home" title="Visit the main page">
              <span>Main page</span>
            </a>
          </li>
          <li>
            <a class="panel-link" href="?entry=all-pages" title="Look at all pages">
              <span>All pages</span>
            </a>
          </li>
          <li>
            <a id="randomPageLink" class="panel-link" title="Load a random page">
              <span>Random page</span>
            </a>
          </li>
          <li>
            <a class="panel-link" href="?entry=help" title="Get some help">
              <span>Help</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="panel wiki-content main-border">
        <p class="panel-label">Books</p>
        <ul class="panel-list">
          <li>
            <a class="panel-link" href="https://docs.google.com/document/d/1SCAqx2TM08QJp9W8waC3sXVsQbn6opX7FLpoLhBMtJM/edit?usp=sharing" target="_blank" title="Read The Prince's Truth">
              <span>The Prince's Truth</span>
            </a>
          </li>
          <li>
            <a class="panel-link" href="https://docs.google.com/document/d/1znis8jsUf_rI-8urWsdnmdusVwqlymZG8xuqvJfN74Y/edit?usp=sharing" target="_blank" title="Read Heyvan">
              <span>Heyvan</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="main-panel wiki-content main-border">
      <div class="header">
        <div class="header-buttons">
          <div id="sourceButton" class="source-button">
            <a class="header-link" title="View the page's source">View source</a>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div id="contentBody" class="content-body"></div>
        <div class="side-spacer"></div>
      </div>
    </div>
  </div>

  <footer class="footer">
    <p>
      Website created by
      <a class="footer-link" href="https://github.com/FOXY571" target="_blank">Thomas Towson</a>
    </p>
  </footer>
</main>
</template>

<script setup></script>

<style scoped>
.background {
  position: fixed;

  background-image: url("./assets/images/background.jpg");
  background-size: cover;
  background-position: center;
  filter: blur(3px);
  
  transform: scale(1.1);
  height: 100%;
  width: 100%;
  z-index: -1;
}

.logo {
  background-image: url("./assets/images/logo.png");
  background-repeat: no-repeat;
  background-position: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 175px;
}

.logo a {
  width: 325px;
  height: 50%;
}

.content-wrapper {
  flex: 1;

  display: flex;
  gap: 10px;

  margin: 25px;
  margin-top: 0;
}

.wiki-content {
  background: url("./assets/images/content-background.jpg");
  background-repeat: repeat-y;
  background-size: 100%;

  box-shadow: 2.5px 2.5px 10px 0 rgba(10, 10, 10, 0.7); 
}

.panels {
  background-size: unset;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel {
  background-size: unset;

  width: 200px;
  height: min-content;
}

.panel-label,
.header {
  background-color: rgba(0, 0, 0, 0.15);

  border-color: rgb(20, 20, 20);
  border-style: solid;
  border-width: 0 0 1px 0;
  border-radius: 5px 5px 0 0;

  font-size: 17px;
  line-height: 10px;

  margin: 0;
  padding: 10px;
}

.panel-list {
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  list-style-type: none;

  margin: 0;
  padding: 0;
}

.panel-link {
  color: var(--link-color);
  font-size: 14px;
  text-decoration: none;

  display: block;
  
  margin: 7px;
  padding: 7px;

  transition: background 0.3s;
  cursor: pointer;
}

.panel-link:hover,
.header-link:hover {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.panel-link:active,
.header-link:active {
  text-decoration: underline;
}

.main-panel {
  flex: 1;
}

.header-buttons {
  display: flex;
  justify-content: right;

  margin: 0;
  margin-right: 300px;
}

.header-link {
  color: var(--link-color);
  font-size: 14px;
  text-decoration: none;
  
  margin: 0px;
  padding: 7px;

  transition: background 0.3s;
  cursor: pointer;
}

.main-content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  display: flex;
  overflow: hidden;
}

.content-body {
  flex: 1;
  overflow: auto;

  height: min-content;
  padding: 20px;
}

.side-spacer {
  width: 300px;
}

.footer {
  background-color: var(--background-color);

  display: flex;
  justify-content: center;
}

.footer-link {
  color: var(--primary-color);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

@media (max-width: 1250px) {
  .side-spacer {
    width: 0;
  }

  .header-buttons {
    margin-right: 0;
  }
}

@media (max-width: 900px) {
  .logo {
    background-size: auto 75%;

    height: 135px;
  }

  .content-wrapper {
    flex-direction: column-reverse;
    justify-content: start;
  }

  .panels {
    flex-direction: row;
  }

  .main-content {
    flex: 0;
  }
}

@media (max-width: 600px) {
  .logo {
    background-size: auto 65%;

    height: 100px;
  }
}

@media screen and (max-width: 450px) {
  .panels {
    flex-direction: column;
  }

  .panel {
    width: auto;
  }
}
</style>
