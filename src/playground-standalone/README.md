
# ML Playground - Standalone Version

This is an isolated version of the ML Playground that can run independently of the main application.

## Features

- Visual pipeline builder with drag-and-drop nodes
- Fine-tuning parameters for different ML algorithms (CNN, SVM, Random Forest, MobileNet)
- Interactive demo with step-by-step guidance
- Pipeline execution simulation with detailed logs
- Save/Load pipeline functionality
- Responsive design with collapsible sidebar

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the standalone directory:
   ```bash
   cd src/playground-standalone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

### Building for Production

To build the standalone version for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Adding Nodes**: Drag nodes from the left sidebar to the canvas
2. **Connecting Nodes**: Click and drag from output handles to input handles
3. **Configuring Nodes**: Double-click any node to open its configuration dialog
4. **Running Pipeline**: Click the "Run Pipeline" button to execute the workflow
5. **Viewing Demo**: Click the "Demo" button to see an interactive tutorial

## Node Types

- **Data Input**: Upload or define your dataset
- **Preprocessing**: Clean and transform your data
- **Model**: Choose and configure ML algorithms
- **Training**: Set training parameters
- **Evaluation**: Configure performance metrics
- **Output**: Export your trained model

## Algorithm Support

- **CNN**: Convolutional Neural Networks with customizable layers, filters, and activation functions
- **SVM**: Support Vector Machines with kernel selection and hyperparameters
- **Random Forest**: Ensemble learning with configurable estimators and depth
- **MobileNet**: Transfer learning with pre-trained models

## License

This project is part of the larger ML education platform.
