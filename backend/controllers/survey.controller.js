
const fetchAdditionalQuestions = async (req, res) => {
    try {
      const { topic } = req.params;
      const questions = {
        Technology: [
          { text: 'What is your preferred development environment?' },
          { text: 'How do you keep up with the latest technology trends?' }
        ],
        Health: [
          { text: 'Do you follow any specific workout regimen?' },
          { text: 'How do you monitor your diet?' }
        ],
        Education: [
          { text: 'What motivated you to choose your field of study?' },
          { text: 'What are your future educational goals?' }
        ]
      };
      console.log(questions[topic]) ; 
      
      res.status(200).json(questions[topic] || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    fetchAdditionalQuestions
};
  