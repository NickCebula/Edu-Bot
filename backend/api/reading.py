# from typing import List

# class Question(BaseModel):
#   question: str
#   options: List[str]
#   answer: str

# class PassageData(BaseModel):
#   passage: str
#   questions: List[Question]

# # Example data
# reading_data = PassageData(
#   passage="Your reading passage text...",
#   questions=[
#     Question(
#       question="What is ...?",
#       options=["A", "B", "C", "D"],
#       answer="A"
#     )
#   ]
# )

# @app.get("/reading", response_model=PassageData)
# def get_reading():
#   return reading_data