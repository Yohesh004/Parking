

# Digital Twin Parking System 🚗

This project is a **Digital Twin** of a parking system developed in **Unity**, integrating **ThingSpeak API** to fetch real-time parking slot occupancy data. The simulation dynamically updates the parking status, helping users visualize available and occupied parking slots in real-time.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
- [ThingSpeak API Setup](#thingspeak-api-setup)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **Digital Twin Parking System** is designed to simulate real-time parking slot availability using a 3D environment in Unity. This system fetches live data from **ThingSpeak**, an IoT analytics platform, where sensors or manual inputs provide real-time data about parking slot availability. The goal is to provide an intuitive and visual way for users to monitor parking occupancy and availability, making parking management efficient and user-friendly.

## Features

- **Real-time Parking Slot Updates:** Fetches live parking slot data via ThingSpeak API.
- **Dynamic Slot Representation:** Available slots are represented visually in Unity; occupied slots change colors based on occupancy.
- **3D Visualization:** Fully interactive 3D environment, allowing users to navigate and inspect the parking area.
- **Responsive Parking System:** Parking slots dynamically update their status based on API data.
- **API Integration:** Fetches data periodically from ThingSpeak, ensuring real-time updates in the simulation.

## Technology Stack

- **Unity3D** - Game engine for creating the 3D parking simulation.
- **C#** - Primary programming language for scripting in Unity.
- **ThingSpeak API** - API for retrieving real-time IoT data.
- **RESTful API** - Used to communicate with the ThingSpeak platform and fetch parking data.

## System Architecture

1. **ThingSpeak API**: Collects real-time data from sensors (or manually entered data) indicating parking slot occupancy.
2. **Unity Application**: Visualizes the parking lot with parking slots. It periodically requests parking data from the ThingSpeak API.
3. **Real-time Data Update**: Unity processes the data and updates the parking slot colors (green for available, red for occupied).
4. **Simulation UI**: Allows users to interact with the parking system, showing visual indicators of parking slot availability.

## Setup Instructions

Follow these steps to set up the project on your local machine:

### Prerequisites

- **Unity 2020.3+**: Download and install [Unity Hub](https://unity.com/download) and the version required for this project.
- **Visual Studio or any C# IDE**: To edit and run scripts.
- **ThingSpeak Account**: Sign up at [ThingSpeak](https://thingspeak.com) to create a channel for parking slot data.

### Clone the Repository

```bash
git clone https://github.com/Yohesh004/DigitalTwinAutoParkino.git
cd DigitalTwinAutoParkino
```

### Open the Project in Unity

1. Open **Unity Hub**.
2. Select **Open** and navigate to the cloned project folder.
3. Let Unity import all assets and configure the environment.

### Install Required Unity Packages

Make sure you have the following Unity packages installed:
- **Unity UI Toolkit** for building the user interface.
- **Unity Web Request** for making API calls.

You can install these through Unity's **Package Manager**.

## ThingSpeak API Setup

To integrate ThingSpeak for real-time data:

1. **Create a ThingSpeak Account**:
   - Go to [ThingSpeak](https://thingspeak.com) and create an account.
   
2. **Create a Channel**:
   - Once logged in, create a new channel. Each parking slot will represent a field in the channel.
   - For example:
     - Field 1: Slot 1 status
     - Field 2: Slot 2 status

3. **Set Up Write/Read API Keys**:
   - After creating the channel, go to the **API Keys** section.
   - Copy the **Read API Key** (you’ll need this to fetch data).

4. **Populate the Channel with Data**:
   - You can either simulate data via ThingSpeak's interface or connect it to IoT sensors in a real parking lot.

### Update Unity Project with API Key

1. Open the script where the ThingSpeak API is called (e.g., `ThingSpeakAPIHandler.cs`).
2. Replace the placeholder API key with your ThingSpeak **Read API Key**:
   ```csharp
   string apiKey = "YOUR_THINGSPEAK_API_KEY";
   ```

3. Modify the URL if needed:
   ```csharp
   string url = "https://api.thingspeak.com/channels/YOUR_CHANNEL_ID/fields/1.json?api_key=" + apiKey;
   ```

## Usage

1. **Run the Simulation**:
   - Press the **Play** button in Unity to start the simulation.
   - The parking lot will be displayed in a 3D environment.

2. **Real-time Updates**:
   - The simulation fetches data from ThingSpeak at regular intervals.
   - Occupied parking slots will turn **red**, and available slots will be shown in **green**.

3. **Customization**:
   - You can configure the refresh interval or add more slots by modifying the script responsible for fetching and updating the parking slots.

## Future Enhancements

- **Integration with IoT Sensors**: Real-time parking data via hardware sensors connected to ThingSpeak.
- **Mobile Support**: Create a mobile-friendly version of the parking simulation.
- **AI-based Parking Predictions**: Predict parking availability using historical data and machine learning.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature-xyz`).
5. Open a pull request to the `main` branch.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

### Notes:
- Replace placeholders like `YOUR_THINGSPEAK_API_KEY` and `YOUR_CHANNEL_ID` with actual values.
- Include relevant screenshots or gifs in the "Screenshots" section to visually represent the simulation.
- You can expand the "Future Enhancements" section based on your vision for the project.

