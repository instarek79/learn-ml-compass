
export const learningModules = [
  {
    id: 'intro',
    title: 'Introduction to AI',
    description: 'Basic concepts and history of artificial intelligence',
    icon: '🤖',
    lessons: [
      {
        id: 'what-is-ai',
        title: 'What is Artificial Intelligence?',
        completed: false,
        content: `Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.

Key characteristics of AI:
• Learning: The ability to improve performance based on experience
• Reasoning: The ability to solve problems through logical deduction
• Perception: The ability to interpret sensory data
• Language Understanding: The ability to process and respond to human language

AI is everywhere around us today - from recommendation systems on Netflix to voice assistants like Siri, from GPS navigation to fraud detection in banking.`,
        codeExample: `# Simple AI example: A basic decision-making system
def simple_ai_decision(temperature, weather):
    """
    A simple AI that decides what to wear based on conditions
    """
    if temperature > 25 and weather == "sunny":
        return "Wear light clothes and sunglasses"
    elif temperature < 10 and weather == "rainy":
        return "Wear warm clothes and take an umbrella"
    elif weather == "rainy":
        return "Take an umbrella"
    else:
        return "Dress comfortably"

# Test the AI
temp = 28
weather = "sunny"
decision = simple_ai_decision(temp, weather)
print(f"AI recommends: {decision}")`
      },
      {
        id: 'history-evolution',
        title: 'History and Evolution of AI',
        completed: false,
        content: `The history of AI spans several decades with major milestones:

1950s - The Beginning:
• Alan Turing proposes the "Turing Test"
• First AI programs like Logic Theorist

1960s - Early Development:
• ELIZA chatbot created
• First neural networks developed

1980s - AI Winter and Revival:
• Expert systems become popular
• Machine learning gains attention

1990s - Practical Applications:
• Deep Blue defeats chess champion Garry Kasparov
• Internet enables data collection for AI

2000s - Big Data Era:
• Google's PageRank algorithm
• Netflix recommendation system

2010s - Deep Learning Revolution:
• ImageNet competition breakthrough
• AlphaGo defeats Go champion

2020s - AI Everywhere:
• GPT models and large language models
• AI in healthcare, autonomous vehicles, and more`,
        codeExample: `# Timeline visualization of AI milestones
import matplotlib.pyplot as plt
import pandas as pd

# AI milestones data
milestones = {
    'Year': [1950, 1956, 1966, 1997, 2011, 2016, 2020],
    'Event': [
        'Turing Test',
        'AI Term Coined',
        'ELIZA Chatbot',
        'Deep Blue vs Kasparov',
        'IBM Watson wins Jeopardy',
        'AlphaGo vs Lee Sedol',
        'GPT-3 Released'
    ],
    'Impact': [9, 10, 6, 8, 7, 9, 10]
}

df = pd.DataFrame(milestones)
print("AI Milestones Timeline:")
print(df.to_string(index=False))`
      },
      {
        id: 'types-of-ai',
        title: 'Types of AI: Narrow vs General',
        completed: false,
        content: `AI can be categorized into different types based on capabilities:

NARROW AI (Weak AI):
• Designed for specific tasks
• Examples: Chess programs, voice recognition, image classification
• Current state of most AI systems
• Very good at one thing, but can't generalize

GENERAL AI (Strong AI):
• Human-level intelligence across all domains
• Can understand, learn, and apply knowledge like humans
• Currently theoretical - doesn't exist yet
• Goal of many AI researchers

ARTIFICIAL SUPER INTELLIGENCE (ASI):
• Surpasses human intelligence in all areas
• Purely hypothetical at this point
• Subject of much debate and speculation

REACTIVE MACHINES:
• No memory, responds to current input only
• Example: Deep Blue chess computer

LIMITED MEMORY:
• Uses past experiences to make decisions
• Example: Self-driving cars, recommendation systems

THEORY OF MIND:
• Understanding emotions and beliefs (future AI)

SELF-AWARE:
• Conscious AI (far future speculation)`,
        codeExample: `# Example of Narrow AI: Simple pattern recognition
import random

class NarrowAI_PatternDetector:
    def __init__(self):
        self.patterns = {}
    
    def learn_pattern(self, sequence):
        """Learn from a sequence of numbers"""
        for i in range(len(sequence) - 1):
            current = sequence[i]
            next_val = sequence[i + 1]
            
            if current not in self.patterns:
                self.patterns[current] = []
            self.patterns[current].append(next_val)
    
    def predict_next(self, current_number):
        """Predict next number based on learned patterns"""
        if current_number in self.patterns:
            return random.choice(self.patterns[current_number])
        return "No pattern found"

# Create and train narrow AI
ai = NarrowAI_PatternDetector()
ai.learn_pattern([1, 2, 3, 4, 5])
ai.learn_pattern([2, 4, 6, 8, 10])

print(f"After 3, AI predicts: {ai.predict_next(3)}")
print(f"After 4, AI predicts: {ai.predict_next(4)}")`
      }
    ]
  },
  {
    id: 'data',
    title: 'Data and Datasets',
    description: 'Understanding data types, structures, and preparation',
    icon: '📊',
    lessons: [
      {
        id: 'data-types',
        title: 'Types of Data: Structured vs Unstructured',
        completed: false,
        content: `Data is the fuel of AI and machine learning. Understanding different types of data is crucial:

STRUCTURED DATA:
• Organized in rows and columns (like Excel sheets)
• Examples: Databases, CSV files, financial records
• Easy to search, analyze, and process
• About 20% of all data

UNSTRUCTURED DATA:
• No predefined format or organization
• Examples: Text documents, images, videos, social media posts
• Requires special processing techniques
• About 80% of all data

SEMI-STRUCTURED DATA:
• Has some organization but not fully structured
• Examples: JSON, XML, emails with headers
• Mix of structured and unstructured elements

DATA TYPES BY FORMAT:
• Numerical: Numbers (age, price, temperature)
• Categorical: Categories (color, gender, country)
• Text: Words and sentences
• Images: Pictures and graphics
• Audio: Sound recordings
• Video: Moving pictures with sound
• Time Series: Data points over time`,
        codeExample: `# Working with different data types in Python
import pandas as pd
import numpy as np

# Structured data example
structured_data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Salary': [50000, 60000, 70000, 55000],
    'Department': ['IT', 'HR', 'Finance', 'IT']
}

df = pd.DataFrame(structured_data)
print("Structured Data:")
print(df)
print(f"\\nData types:\\n{df.dtypes}")

# Unstructured data example
unstructured_text = [
    "I love this product! It's amazing.",
    "Not satisfied with the service.",
    "Great quality and fast delivery!",
    "Could be better, average experience."
]

print("\\nUnstructured Text Data:")
for i, text in enumerate(unstructured_text, 1):
    print(f"{i}: {text}")

# Data analysis
print(f"\\nAverage age: {df['Age'].mean()}")
print(f"Department distribution:\\n{df['Department'].value_counts()}")`
      },
      {
        id: 'data-collection',
        title: 'Data Collection and Sources',
        completed: false,
        content: `Data collection is the first step in any AI project. Here are common sources and methods:

PRIMARY DATA SOURCES:
• Surveys and questionnaires
• Experiments and observations
• Sensors and IoT devices
• User interactions and logs
• Direct measurements

SECONDARY DATA SOURCES:
• Public datasets (Kaggle, UCI, government data)
• APIs (Twitter, Reddit, weather services)
• Web scraping
• Existing databases
• Research publications

DATA COLLECTION METHODS:
• Manual collection (interviews, surveys)
• Automated collection (sensors, logs)
• Web scraping (extracting web data)
• API integration (structured data access)
• Crowdsourcing (Amazon Mechanical Turk)

CONSIDERATIONS:
• Data quality and accuracy
• Privacy and ethical concerns
• Legal compliance (GDPR, etc.)
• Cost and time constraints
• Data volume and storage needs
• Real-time vs batch collection`,
        codeExample: `# Data collection example using APIs and web scraping
import requests
import pandas as pd
from datetime import datetime

# Example 1: Collecting data from a public API
def collect_weather_data(city):
    """
    Collect weather data from a public API
    Note: You'll need an API key for real implementation
    """
    # This is a mock example
    mock_data = {
        'city': city,
        'temperature': 22,
        'humidity': 65,
        'timestamp': datetime.now()
    }
    return mock_data

# Example 2: Creating a simple data collection function
def collect_user_feedback():
    """Simulate collecting user feedback"""
    feedback_data = []
    
    # Simulated user responses
    responses = [
        {'user_id': 1, 'rating': 5, 'comment': 'Excellent service'},
        {'user_id': 2, 'rating': 4, 'comment': 'Good but could improve'},
        {'user_id': 3, 'rating': 3, 'comment': 'Average experience'}
    ]
    
    return responses

# Collect data
weather = collect_weather_data("New York")
feedback = collect_user_feedback()

print("Weather Data:", weather)
print("\\nFeedback Data:")
for item in feedback:
    print(f"User {item['user_id']}: {item['rating']}/5 - {item['comment']}")

# Convert to DataFrame for analysis
df_feedback = pd.DataFrame(feedback)
print(f"\\nAverage rating: {df_feedback['rating'].mean():.1f}")`
      }
    ]
  },
  {
    id: 'ml_basics',
    title: 'Machine Learning Basics',
    description: 'Supervised, unsupervised, and reinforcement learning',
    icon: '🧠',
    lessons: [
      {
        id: 'supervised-learning',
        title: 'Supervised Learning Overview',
        completed: false,
        content: `Supervised learning is like learning with a teacher. The algorithm learns from labeled examples.

KEY CONCEPTS:
• Training data has input-output pairs
• Algorithm learns to map inputs to outputs
• Goal: Make predictions on new, unseen data
• Performance measured by prediction accuracy

PROCESS:
1. Collect labeled training data
2. Choose an algorithm
3. Train the model on data
4. Test on unseen data
5. Evaluate performance

TYPES:
• Classification: Predict categories (spam/not spam)
• Regression: Predict continuous values (house prices)

COMMON ALGORITHMS:
• Linear Regression
• Decision Trees
• Random Forest
• Support Vector Machines
• Neural Networks

ADVANTAGES:
• Clear performance metrics
• Well-understood techniques
• Good for many practical problems

CHALLENGES:
• Requires labeled data (expensive)
• May not generalize well
• Can overfit to training data`,
        codeExample: `# Supervised Learning Example: Simple Linear Regression
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Generate sample data: house sizes and prices
np.random.seed(42)
house_sizes = np.random.normal(1500, 500, 100).reshape(-1, 1)
house_prices = house_sizes.flatten() * 100 + np.random.normal(0, 10000, 100)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    house_sizes, house_prices, test_size=0.2, random_state=42
)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
score = model.score(X_test, y_test)
print(f"Model accuracy (R²): {score:.3f}")
print(f"Slope: {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")

# Example prediction
new_house_size = [[2000]]
predicted_price = model.predict(new_house_size)
print(f"\\nPredicted price for 2000 sq ft house: {predicted_price[0]:,.2f}")`
      },
      {
        id: 'classification-regression',
        title: 'Classification vs Regression',
        completed: false,
        content: `Classification and Regression are the two main types of supervised learning:

CLASSIFICATION:
• Predicts discrete categories or classes
• Output is a label or category
• Examples:
  - Email spam detection (spam/not spam)
  - Image recognition (cat/dog/bird)
  - Medical diagnosis (disease/no disease)
  - Sentiment analysis (positive/negative)

CLASSIFICATION TYPES:
• Binary: Two classes (yes/no, spam/ham)
• Multi-class: Multiple classes (red/green/blue)
• Multi-label: Multiple labels per instance

REGRESSION:
• Predicts continuous numerical values
• Output is a number
• Examples:
  - House price prediction
  - Stock price forecasting
  - Temperature prediction
  - Sales forecasting

CHOOSING BETWEEN THEM:
• Ask: "What type of output do I need?"
• Discrete categories → Classification
• Continuous numbers → Regression

EVALUATION METRICS:
Classification:
• Accuracy, Precision, Recall, F1-score

Regression:
• Mean Squared Error, R², Mean Absolute Error`,
        codeExample: `# Classification vs Regression Examples
from sklearn.datasets import make_classification, make_regression
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.metrics import accuracy_score, mean_squared_error
import numpy as np

# CLASSIFICATION EXAMPLE
print("=== CLASSIFICATION EXAMPLE ===")
# Generate classification data
X_class, y_class = make_classification(n_samples=100, n_features=2, 
                                      n_redundant=0, n_informative=2,
                                      random_state=42)

# Train classifier
classifier = LogisticRegression()
classifier.fit(X_class, y_class)

# Make predictions
y_pred_class = classifier.predict(X_class)
accuracy = accuracy_score(y_class, y_pred_class)

print(f"Classification Accuracy: {accuracy:.3f}")
print(f"Sample predictions: {y_pred_class[:5]}")
print(f"Actual labels: {y_class[:5]}")

print("\\n=== REGRESSION EXAMPLE ===")
# Generate regression data
X_reg, y_reg = make_regression(n_samples=100, n_features=1, 
                              noise=10, random_state=42)

# Train regressor
regressor = LinearRegression()
regressor.fit(X_reg, y_reg)

# Make predictions
y_pred_reg = regressor.predict(X_reg)
mse = mean_squared_error(y_reg, y_pred_reg)

print(f"Regression MSE: {mse:.3f}")
print(f"Sample predictions: {y_pred_reg[:5]}")
print(f"Actual values: {y_reg[:5]}")

print("\\n=== KEY DIFFERENCES ===")
print("Classification output: Discrete categories")
print("Regression output: Continuous numbers")`
      }
    ]
  },
  {
    id: 'neural_networks',
    title: 'Neural Networks',
    description: 'Building blocks of deep learning',
    icon: '🕸️',
    lessons: [
      {
        id: 'what-are-neural-networks',
        title: 'What are Neural Networks?',
        completed: false,
        content: `Neural networks are computing systems inspired by biological neural networks. They're the foundation of deep learning and modern AI.

BIOLOGICAL INSPIRATION:
• Based on how neurons work in the brain
• Neurons receive signals, process them, and send output
• Networks of neurons create complex behaviors
• Artificial neurons mimic this process

ARTIFICIAL NEURAL NETWORK COMPONENTS:
• Neurons (nodes): Processing units
• Connections (edges): Weighted links between neurons
• Layers: Groups of neurons
• Activation functions: Determine neuron output

NETWORK STRUCTURE:
• Input Layer: Receives data
• Hidden Layers: Process information
• Output Layer: Produces final result

HOW THEY WORK:
1. Input data enters the network
2. Data flows through hidden layers
3. Each neuron applies weights and activation function
4. Output layer produces final prediction
5. Network learns by adjusting weights

ADVANTAGES:
• Can learn complex patterns
• Good for non-linear relationships
• Flexible architecture
• Universal function approximators

APPLICATIONS:
• Image recognition
• Natural language processing
• Speech recognition
• Game playing (Chess, Go)
• Autonomous vehicles`,
        codeExample: `# Simple Neural Network Implementation
import numpy as np

class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights randomly
        self.W1 = np.random.randn(input_size, hidden_size) * 0.1
        self.W2 = np.random.randn(hidden_size, output_size) * 0.1
        self.b1 = np.zeros((1, hidden_size))
        self.b2 = np.zeros((1, output_size))
    
    def sigmoid(self, x):
        """Activation function"""
        return 1 / (1 + np.exp(-np.clip(x, -250, 250)))
    
    def forward(self, X):
        """Forward propagation"""
        # Hidden layer
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        
        # Output layer
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        
        return self.a2
    
    def predict(self, X):
        """Make predictions"""
        output = self.forward(X)
        return (output > 0.5).astype(int)

# Create a simple neural network
nn = SimpleNeuralNetwork(input_size=2, hidden_size=4, output_size=1)

# Example data: XOR problem
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
print("Input data:")
print(X)

# Make predictions (before training)
predictions = nn.forward(X)
print("\\nPredictions (untrained network):")
print(predictions.flatten())

print("\\nNetwork Architecture:")
print(f"Input layer: {X.shape[1]} neurons")
print(f"Hidden layer: 4 neurons")
print(f"Output layer: 1 neuron")
print(f"Total parameters: {nn.W1.size + nn.W2.size + nn.b1.size + nn.b2.size}")`
      }
    ]
  }
];
