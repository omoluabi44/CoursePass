import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardCourses = createAsyncThunk(
  'courses/fetchDashboardCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://omoluabi2.pythonanywhere.com//api/v1/all_courses');
      // const response = await fetch('http://localhost:5000/api/v1/all_courses');
   
      if (!response.ok) throw new Error('Failed to fetch dashboard courses');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourseDetails = createAsyncThunk(
  'courses/fetchCourseDetails',
  async (courseID, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://omoluabi2.pythonanywhere.com/api/v1/courses/${courseID}/content`);
      // const response = await fetch(` http://localhost:5000/api/v1/courses/${courseID}/content`);
     
      if (!response.ok) throw new Error('Failed to fetch course details');
      const data = await response.json();
      // const course = data.find(c => c.courseID === courseID);
      if (!data) throw new Error('Course not found');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    dashboardCourses: [],
    selectedCourse: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dashboardCourses = action.payload;
      })
      .addCase(fetchDashboardCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default coursesSlice.reducer;

