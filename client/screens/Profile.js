import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TextInput, ScrollView, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { SelectList } from 'react-native-dropdown-select-list';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  useEffect(() => {
    // Initialize the questions array with sample questions
    const sampleQuestions = [
      'What is your full name?',
      'How old are you (range)?',
      'How many years have you been in the US?',
      'Are you legally authorized to work in the US?',
      'Have you ever had a paying job before, if so click yes and you can customize your employment history in a future stage.',
      'What is your current employment status (employed, unemployed, underemployed)?',
      'What field of work are you most experienced in?',
      'What type of job are you looking for? (e.g., full-time, part-time, temporary, remote)',
      'What languages are you fluent in?',
      'How confident are you in your English language skills for verbal communication on a scale of 1 - 5?',
      'What languages would you prefer for work?',
      'What is your highest level of education?',
      'Do you have access to a computer and the internet? (Important for remote job opportunities)',
      'How confident are you in your English language skills for written communication on a scale of 1-5?'
      // Add more questions here...
    ];

    // Initialize answers with an empty string for each question
    const initialAnswers = sampleQuestions.map(() => '');

    setQuestions(sampleQuestions);
    setAnswers(initialAnswers);
  }, []);

  const [answers, setAnswers] = useState([]);
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const isOptionSelected = (option) => {
    return selectedOptions.includes(option);
  };

  const handleAnswerChange = (answer) => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = Text;
      setAnswers(updatedAnswers);
    
  };

    const [selected, setSelected] = React.useState("");
    
    const data = [
        {key:'1', value:'STEM Fields:', disabled:true},
        {key:'2', value:'STEM Field - Science (Medicine, Physics, Chemistry etc.)'},
        {key:'3', value:'STEM Field - Technology (Software, Hardware, Electrical etc.)'},
        {key:'4', value:'STEM Field - Engineering (Mechanical, Civil, Biomedical etc.)'},
        {key:'5', value:'STEM Field - Mathematics'},
        {key:'6', value:'Business:', disabled:true},
        {key:'7', value:'Business - Finance and Accounting'},
        {key:'8', value:'Business - Marketing and Sales'},
        {key:'9', value:'Business - Human Resources'},
        {key:'10', value:'Business - Operations and Supply Chain'},
        {key:'11', value:'Business - Communication (Store worker, Cashier, Retail)'},
        {key:'12', value:'Arts and Humanities:', disabled:true},
        {key:'13', value:'Arts and Humanities - Liberal Arts / Government)'},
        {key:'14', value:'Arts and Humanities - Law)'},
        {key:'15', value:'Arts and Humanities - Art (Music, Painting, Drawing etc.))'},
        {key:'16', value:'Arts and Humanities - Culinary Arts (Cooking, Chef etc.))'},
        {key:'17', value:'Other:', disabled:true},
        {key:'18', value:'Natural resources, agriculture, or related production'},
        {key:'10', value:'Manufacturing and Utilities'},

    ]

    const data1 = [
      {key:'1', value:'No schooling completed'},
      {key:'2', value:'Nursery school'},
      {key:'3', value:'Grades 1 through 11'},
      {key:'4', value:'12th grade—no diploma'},
      {key:'5', value:'Regular high school diploma'},
      {key:'6', value:'Some college credit, but less than 1 year of college'},
      {key:'7', value:'1 or more years of college credit, no degree'},
      {key:'8', value:'Associates degree (for example: AA, AS)'},
      {key:'9', value:'Bachelor’s degree (for example: BA. BS)'},
      {key:'10', value:'Master’s degree (for example: MA, MS, MEng, MEd, MSW, MBA)'},
      {key:'11', value:'Professional degree beyond bachelor’s degree (for example: MD, DDS, DVM, LLB, JD)'},
      {key:'12', value:'Doctorate degree (for example, PhD, EdD'},
  ]
  const data2 = [
    {key:'1', value:'Full - Time'},
    {key:'2', value:'Part - Time'},
    {key:'3', value:'Remote'},
    {key:'4', value:'Temporary'},
]
const data3 = [
  {key:'1', value:'1 - Not confident at all (Can not speak at all)'},
  {key:'2', value:'2 - Somewhat confident (Can understand some and speak a bit)'},
  {key:'3', value:'3 - Confident (Can speak and understand most English)'},
  {key:'4', value:'4 - Very Confident (Can speak and understand English almost perfectly)'},
  {key:'5', value:'5 - Fluent (Can speak and understand English perfectly)'},
]

const data4 = [
  {key:'1', value:'1 - Can not write English at all'},
  {key:'2', value:'2 - Can write a few words in English'},
  {key:'3', value:'3 - Can write sentences in English (basic detail)'},
  {key:'4', value:'4 - Can write paragraphs in English (some detail)'},
  {key:'5', value:'5 - Can write very detailed reports in English'},//Under 18 years  18-24 years  25-34 years  35-44 years  45-55 years
]
const data7 = [
  {key:'1', value:'Under 18 years'},
  {key:'2', value:'18-24 years '},
  {key:'3', value:'25-34 years'},
  {key:'4', value:'35-44 years'},
  {key:'5', value:'45-55 years'},//Under 18 years  18-24 years  25-34 years  35-44 years  45-55 years
]
const handleOptionSelect = (option) => {
  // Toggle selection if the same option is selected again
  if (selectedOption === option) {
    setSelectedOption(null);
  } else {
    setSelectedOption(option);
  }
};
const [selectedOption, setSelectedOption] = useState(null);

const showAlert = () => {
  Alert.alert(
    'Confirmation',
    'Are you sure you want to go back? Results will not be saved!',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // Handle the user's confirmation to go back
          navigation.goBack();
        },
      },
    ],
    { cancelable: false }
  );
};

  return (
    <ImageBackground source={require('../assets/images/back.png')} style={styles.image}>
      <View className="flex-1 bg-white" style={styles.pop} >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row justify-start">
            <TouchableOpacity  
               onPress={showAlert}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
        
        <Text style={{
                    color: '#ffb703', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 38, // You can adjust the font size here
                    textAlign: 'center', // You can set the text alignment here
                    marginTop: 40,
                    fontFamily:'sans-serif',
              }}>Questionnaire</Text>
              <Text style={{
                    color: '#ffb703', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 25, // You can adjust the font size here
                    fontWeight: 'bold', // You can specify the font weight here
                    textAlign: 'center', // You can set the text alignment here
                    marginTop: 30,
              }}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
              <Text style={{
                    color: '#ffb703', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 27, // You can adjust the font size here

                    textAlign: 'center', // You can set the text alignment here
                    marginTop: 30,
                    marginBottom:20,
                    marginRight:40,
                    marginLeft:40
              }}>{questions[currentQuestionIndex]}</Text>
              {/* Render multiple-choice options here */}
              {currentQuestionIndex === 0 ? (
                <TextInput
                  placeholder="Enter your name"
                  value={answers[currentQuestionIndex]}
                  onChangeText={(text) => handleAnswerChange(text)}
                  style={{
                    color: '#000000', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 27, // You can adjust the font size here
                    fontWeight: 'bold', // You can specify the font weight here
                    textAlign: 'center', // You can set the text alignment here
              }}
                />
              ) : currentQuestionIndex === 1 ?(
                <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data7} 
                save="value"
                customStyles={styles.selectListStyle}
            /> 
              ): currentQuestionIndex === 2 ?(
                // Render your multiple-choice options or other question types here
                // For simplicity, we're using text input for the first question
                <View>
                <TextInput
                  placeholder="Enter a number"
                  value={answers[currentQuestionIndex]}
                  onChangeText={handleAnswerChange}
                  style={{
                    color: '#000000', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 27, // You can adjust the font size here
                    fontWeight: 'bold', // You can specify the font weight here
                    textAlign: 'center', // You can set the text alignment here
              }}
                />
                </View>
              ): 
              
              currentQuestionIndex === 3 ?(<View>
                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'Yes, I am' && styles.selectedOption,
            ]}

            onPress={() => handleOptionSelect('Yes, I am')} >
                    <Text style={[
                styles.button1,
                selectedOption === 'Yes, I am' && styles.selectedText,
              ]}>Yes, I am</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'No, I am not' && styles.selectedOption,
            ]}

            onPress={() => handleOptionSelect('No, I am not')}>
                    <Text style={[
                styles.button1,
                selectedOption === 'No, I am not' && styles.selectedText,
              ]}>No, I am not</Text>
                  </TouchableOpacity>
                </View>):
              
                currentQuestionIndex === 4 ?(<View>
                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'Yes, I have' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Yes, I have')} >
                    <Text style={[
                styles.button1,
                selectedOption === 'Yes, I have' && styles.selectedText,
              ]}>Yes, I have</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'No, I have not' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('No, I have not')} >
                    <Text style={[
                styles.button1,
                selectedOption === 'Yes, I have' && styles.selectedText,
              ]}>No, I have not</Text>
                  </TouchableOpacity>
                </View>):
                
                currentQuestionIndex === 5 ?(<View>
                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'Employed' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Employed')}>
                    <Text style={[
                styles.button1,
                selectedOption === 'Employed' && styles.selectedText,
              ]}>Employed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'Unemployed' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Unemployed')}>
                    <Text style={[
                styles.button1,
                selectedOption === 'Unemployed' && styles.selectedText,
              ]}>Unemployed</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'Underemployed' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Underemployed')}>
                    <Text style={[
                styles.button1,
                selectedOption === 'Underemployed' && styles.selectedText,
              ]}>Underemployed</Text>
                  </TouchableOpacity>
                </View>):

                currentQuestionIndex === 6 ?(<MultipleSelectList 
                  setSelected={(val) => setSelected(val)} 
                  data={data} 
                  save="value"
                  label="Categories"
              />): currentQuestionIndex === 7 ?(<SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data2} 
                save="value"
            />):
                currentQuestionIndex === 8 ?(<TextInput
                  placeholder="List languages Ex. English, Spanish, French"
                  value={answers[currentQuestionIndex]}
                  onChangeText={handleAnswerChange}
                  style={{
                    color: '#000000', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 18, // You can adjust the font size here
                    fontWeight: 'bold', // You can specify the font weight here
                    textAlign: 'center', // You can set the text alignment here
              }}/>
              ):currentQuestionIndex === 9 ?(<SelectList 
                style = {styles.select}
                setSelected={(val) => setSelected(val)} 
                data={data3} 
                save="value"
            />):
              
              currentQuestionIndex === 10 ? (<TextInput
                  placeholder="List languages Ex. English, Spanish, French"
                  value={answers[currentQuestionIndex]}
                  onChangeText={handleAnswerChange}
                  style={{
                    color: '#000000', // Replace 'your-desired-color-here' with the color you want
                    fontSize: 18, // You can adjust the font size here
                    fontWeight: 'bold', // You can specify the font weight here
                    textAlign: 'center', // You can set the text alignment here
                    marginTop: 30,
                  }}/>):
              currentQuestionIndex === 11 ?
            
            (<SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data1} 
                save="value"
            />): currentQuestionIndex === 12 ?
            (<View>
                <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'Yes, I do' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Yes, I do')}>
                  <Text style={[
                styles.button1,
                selectedOption === 'Yes, I do' && styles.selectedText,
              ]}>Yes, I do</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
              styles.touch,
              selectedOption === 'No, I do not' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('No, I do not')}>
                  <Text style={[
                styles.button1,
                selectedOption === 'No, I do not' && styles.selectedText,
              ]}>No, I do not</Text>
                </TouchableOpacity>
              </View>) : (<SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data4} 
                save="value"
                
            />)}
              
              <View >
              <TouchableOpacity className="py-3 bg-yellow-400 mx-7 rounded-xl" style={{marginTop:40}}
                onPress={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}>
                <Text className="text-xl font-bold text-center text-gray-700">
                      Next
                  </Text>
                </TouchableOpacity> 

                <TouchableOpacity className="py-3 bg-yellow-400 mx-7 rounded-xl" style={{marginTop:10,padding:40}}
                onPress={handlePrev}
                disabled={currentQuestionIndex === 0}>
                  <Text className="text-xl font-bold text-center text-gray-700">
                    Previous
                  </Text>
                </TouchableOpacity>
                
              </View>
          </ScrollView>
        </SafeAreaView>
        
        </View>
        </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  button:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button1:{
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  touch:{
    overflow: 'hidden',
    margin: 20,
    paddingVertical:17,
    marginVertical:6,
    backgroundColor:'#007AFF',
    paddingHorizontal:12,
    borderRadius:12,
    marginLeft:20,
    marginRight:20,
    
  },
  pop:{
    backgroundColor: 'white', flex: 1, backgroundColor: 'white',marginTop: 0,marginBottom: 250,borderRadius: 40, padding: 0
  },
  select:{
    marginTop:30
  },
  selectedOption: {
    backgroundColor: 'green', // Change this to the desired color for the selected option
  },
  selectListStyle: {
    // Define your custom styles for the SelectList component here
    backgroundColor: 'lightblue',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 10,
    
  },
});
