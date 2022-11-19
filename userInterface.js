initPlayBackSlider();
initAddSourceBtn();
enableHelpForCoordinateFields();
initStillMediumMessage();
initModalSheet();

function initModalSheet() {
  var modal = document.querySelector(".modalsheet");
  var openBtn = document.getElementById("question-mark");
  var closeBtn = document.querySelector(".close");

    openBtn.onclick = function () {
    modal.style.display = "block";
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function initStillMediumMessage() {
  let addSourceButton = document.querySelector("#add-source-button");
  window.onload = handleTableDisplay;
  addSourceButton.addEventListener("click", handleTableDisplay);
}

function handleTableDisplay() {
  let stillMessage = document.querySelector(".no-disturbances-message");
  let sourcesTable = document.querySelector(".sources-table");

  if (sources.length == 0) {
    stillMessage.style.display = "block";
    sourcesTable.style.display = "none";
  } else {
    stillMessage.style.display = "none";
    sourcesTable.style.display = "block";
  }
}

function enableHelpForCoordinateFields() {
  let xCoordinateField = document.querySelector("#x-coordinate");
  let yCoordinateField = document.querySelector("#y-coordinate");

  xCoordinateField.addEventListener("click", UnhideHelpText);
  yCoordinateField.addEventListener("click", UnhideHelpText);
}

function UnhideHelpText() {
  let alert = document.querySelector(".alert");
  let help = document.querySelector(".help");

  alert.style.display = "none"; // do not want to display 2 messages
  help.style.display = "block";
  setTimeout(() => (help.style.display = "none"), 5000);
}

function showUnfilledFieldsAlert() {
  let alert = document.querySelector(".alert");
  let help = document.querySelector(".help");

  help.style.display = "none"; // do not want to display 2 messages
  alert.style.display = "block";
}

function initPlayBackSlider() {
  let playbackSlider = document.querySelector("#playback-speed-slider");
  let playBackSpeedValue = document.querySelector(".playback-speed-value");
  playbackSlider.addEventListener("input", () => {
    playbackSpeed = playbackSlider.value;
    playBackSpeedValue.textContent = playbackSlider.value + "x";
  });
}

function initAddSourceBtn() {
  let amplitudeField = document.querySelector("#amplitude");
  let frequencyField = document.querySelector("#frequency");
  let wavelengthField = document.querySelector("#wavelength");
  let xCoordinateField = document.querySelector("#x-coordinate");
  let yCoordinateField = document.querySelector("#y-coordinate");
  let addSourceButton = document.querySelector("#add-source-button");
  let alert = document.querySelector(".alert");
  addSourceButton.addEventListener("click", () => {
    // check for unfilled fields
    if (
      amplitudeField.value == 0 ||
      wavelengthField.value == 0 ||
      frequencyField.value == 0 ||
      xCoordinateField.value == 0 ||
      yCoordinateField.value == 0
    )
      showUnfilledFieldsAlert();
    else {
      sources.push(
        new Source(
          parseFloat(amplitudeField.value),
          parseFloat(wavelengthField.value),
          parseFloat(frequencyField.value),
          parseFloat(xCoordinateField.value),
          parseFloat(yCoordinateField.value)
        )
      );
      setSumOfAmplitudes();
      alert.style.display = "none";
      addSourceToTable(sources[sources.length - 1]);
    }
  });
}

function addSourceToTable(source) {
  let tableBody = document.querySelector(".table-body");
  let row = document.createElement("tr");

  let numberCell = document.createElement("td");
  numberCell.textContent = sources.length;
  let amplitudeCell = document.createElement("td");
  amplitudeCell.textContent = source.amplitude + " m";
  let wavelengthCell = document.createElement("td");
  wavelengthCell.textContent = source.wavelength + " m";
  let frequencyCell = document.createElement("td");
  frequencyCell.textContent = source.frequency + " Hz";
  let coordinateCell = document.createElement("td");
  coordinateCell.textContent = "(" + source.x + ", " + source.y + ")";

  row.append(
    numberCell,
    amplitudeCell,
    wavelengthCell,
    frequencyCell,
    coordinateCell
  );

  tableBody.appendChild(row);
}
