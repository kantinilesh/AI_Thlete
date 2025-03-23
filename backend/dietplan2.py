from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
from flask_cors import CORS
import traceback

# Load environment variables
load_dotenv()



app = Flask(__name__)
CORS(app)

# Initialize fitness agent
try :

    from phi.agent import Agent
    from phi.model.groq import Groq
    from phi.tools.wikipedia import WikipediaTools
    from phi.tools.duckduckgo import DuckDuckGo
    from phi.storage.agent.postgres import PgAgentStorage


    fitness_agent = Agent(
    name="Fitness Agent",
    model=Groq(id="qwen-qwq-32b"),
    storage=PgAgentStorage(table_name="agent_sessions", db_url="postgresql+psycopg://ai:ai@localhost:5532/ai"),
    add_history_to_messages=True,
    num_history_responses=3,
    tools=[
        WikipediaTools(),
        DuckDuckGo()  # Add search capability to a single agent
    ],
    instructions=[
        "You are a professional fitness assistant specializing in diet and workout planning. ",
        "Your primary role is to generate structured fitness and diet plans in a tabular format based on user preferences. ",
        "You only respond to fitness-related queries. If a user asks a question unrelated to fitness, politely remind them ",
        "to ask about fitness topics only.",
        """
        Response Guidelines:
        Table-Based Output:

        All diet and workout plans must be presented in a structured table format using Markdown.

        Include headers like Day, Meal, Calories, Protein, Workout Type, Duration, etc.

        Strict Fitness Scope:

        Only respond to diet plans, workout plans, fitness goals, or nutrition-related questions.

        If a user asks something unrelated, reply with:
        "I can only assist with fitness and diet plans. Please ask me fitness-related questions!"

        Professional Formatting:

        Use bold for important terms (e.g., Calories, Protein, Workout Type).

        Use horizontal rules (---) to separate different sections (e.g., diet plan vs. workout plan).

        Plan Customization:

        Generate fitness/diet plans based on the number of days, user goals (e.g., weight loss, muscle gain), and dietary preferences (e.g., vegetarian, keto, high-protein).

        Example Table Format (Markdown-based Output):

        Diet Plan (7 Days Example):
        | Day  | Breakfast              | Lunch                  | Dinner               | Calories |
        |------|------------------------|------------------------|----------------------|----------|
        | Mon  | Oats + Banana + Nuts   | Grilled Chicken + Rice | Paneer Salad        | 1800 kcal|
        | Tue  | Scrambled Eggs + Toast | Lentil Soup + Quinoa   | Grilled Salmon      | 1900 kcal|
        Workout Plan Example:
        | Day  | Workout Type      | Duration | Intensity |
        |------|------------------|----------|----------|
        | Mon  | Cardio + HIIT    | 45 mins  | High     |
        | Tue  | Strength Training| 60 mins  | Medium   |


        """
    ],
    show_tool_calls=True,
    markdown=True,
)

    print("Successfully initialized fitness agent")
except Exception as e:
    print(f"Error initializing fitness agent: {str(e)}")
    print(traceback.format_exc())
    fitness_agent = None

# Serve the frontend
@app.route('/')
def index():
    return render_template('index1.html')

# Chatbot endpoint
@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Check if fitness_agent was properly initialized
        if fitness_agent is None:
            return jsonify({'response': 'The fitness agent failed to initialize. Check server logs.'}), 500
            
        data = request.json
        if not data:
            return jsonify({'response': 'No data received'}), 400
            
        user_message = data.get('message', '')
        if not user_message:
            return jsonify({'response': 'Please provide a message'}), 400
            
        # Get response from fitness agent
        print(f"Processing message: {user_message}")
        response_obj = fitness_agent.run(user_message)
        
        # Extract the string content from the RunResponse object
        # Check the type to decide how to handle it
        print(f"Response type: {type(response_obj)}")
        
        if hasattr(response_obj, 'content'):
            # If it has a content attribute, use that
            response_text = response_obj.content
        elif hasattr(response_obj, 'text'):
            # If it has a text attribute, use that
            response_text = response_obj.text
        elif hasattr(response_obj, '__str__'):
            # If we can convert it to string, use that
            response_text = str(response_obj)
        else:
            # Fallback
            response_text = "Received a response from the AI but couldn't extract the text content."
            
        print(f"Response extracted: {response_text[:100]}...")  # Print first 100 chars
            
        # Return the response
        return jsonify({'response': response_text})
    except Exception as e:
        error_traceback = traceback.format_exc()
        print(f"Error in /chat endpoint: {str(e)}")
        print(error_traceback)
        return jsonify({'response': f'Server error: {str(e)}. Please check server logs for details.'}), 500

if __name__ == '__main__':
    # Run the app
    app.run(host='0.0.0.0', port=3000, debug=True)