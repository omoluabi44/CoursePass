// questionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await fetch('/pastQuestions.json');
    const data = await response.json();
    return data.map(course => course.courseID);  // Extract only course IDs
  }
);

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (courseID) => {
    const response = await fetch('/pastQuestions.json');
    const data = await response.json();
    const course = data.find(course => course.courseID === courseID);
    return course ? course.questions : [];
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    timer: 0,
    status: 'idle',
    courses: [] // Add a state to store the courses
  },
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    decrementTimer(state) {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload; // Store the list of courses
        state.status = 'succeeded';
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.currentQuestionIndex = 0;
        state.status = 'succeeded';
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { nextQuestion, prevQuestion, setTimer, decrementTimer } = questionSlice.actions;
export default questionSlice.reducer;
