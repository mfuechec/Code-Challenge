## Welcome to my README!

# Basic Authentication
This app just authorizes login information locally.

# Persisting Data
Data is persisted through Async Storage. The array of journal entries that makes up a user's feed is attached to the email address they login with.

# LLM
This app uses OpenAI to analyze the mood of journal entries. You can find that setup in the AddNewModal component.

# Filtering and Organization
Filtering can be found in the UpdateFilters component, which makes use of a SortOptions and FilterOptions sub components.

## Running the app
First, add the OpenAI_API_Key on line 15 of the AddNewModal component.
Then,
`npm i`
`yarn ios`