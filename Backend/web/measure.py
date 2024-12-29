import cv2 as cv
import mediapipe as mp
import math
from web.model.users_measure import Measurement
from web.model.__init__ import storage



def resize(frame, scale=0.2):
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)
    dimensions = (width, height)
    return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

def cal_height(landmark, width, height):
    # Extract coordinates for the nose and heels
    nose = landmark[0]  # NOSE (ID: 0)
    left_heel = landmark[29]  # LEFT_HEEL (ID: 29)
    right_heel = landmark[30]  # RIGHT_HEEL (ID: 30)
    # Convert normalized coordinates to pixel coordinates for the nose and heels
    nose_x, nose_y = int(nose.x * width), int(nose.y * height)
    left_heel_x, left_heel_y = int(left_heel.x * width), int(left_heel.y * height)
    right_heel_x, right_heel_y = int(right_heel.x * width), int(right_heel.y * height)
    # Average coordinates of the heels
    avg_heel_x = (left_heel_x + right_heel_x) // 2
    avg_heel_y = (left_heel_y + right_heel_y) // 2
    # Calculate distance between nose and heel (height estimation)
    distance_nose_to_heel = math.sqrt((avg_heel_x - nose_x) ** 2 + (avg_heel_y - nose_y) ** 2)
    # Extract coordinates for the elbows
    elbow_l = landmark[7]  # LEFT_ELBOW (ID: 7)
    elbow_r = landmark[8]  # RIGHT_ELBOW (ID: 8)
    elbow_l_x, elbow_l_y = int(elbow_l.x * width), int(elbow_l.y * height)
    elbow_r_x, elbow_r_y = int(elbow_r.x * width), int(elbow_r.y * height)

    # Calculate distance between the elbows
    distance_elbows = math.sqrt((elbow_r_x - elbow_l_x) ** 2 + (elbow_l_y - elbow_r_y) ** 2)

    # Estimate full height by adding the distances
    estimated_height = int(distance_nose_to_heel + distance_elbows)
    return estimated_height, (nose_x, nose_y), (avg_heel_x, avg_heel_y)

def cal_leg(landmark,width, height):
    hip_r = landmark[24]  # RIGHT_HIP (ID: 24)
    hip_l = landmark[23]  # LEFT_HIP (ID: 23)
    left_heel = landmark[29]  # LEFT_HEEL (ID: 29)
    right_heel = landmark[30]  # RIGHT_HEEL (ID: 30)

    hip_r_x, hip_r_y = int(hip_r.x * width), int(hip_r.y * height)
    hip_l_x, hip_l_y = int(hip_l.x * width), int(hip_l.y * height)
    left_heel_x, left_heel_y = int(left_heel.x * width), int(left_heel.y * height)
    right_heel_x, right_heel_y = int(right_heel.x * width), int(right_heel.y * height)

    # Average coordinates of the hips
    avg_hip_x = (hip_l_x + hip_r_x) // 2
    avg_hip_y = (hip_l_y + hip_r_y) // 2
    # Average coordinates of the heels
    avg_heel_x = (left_heel_x + right_heel_x) // 2
    avg_heel_y = (left_heel_y + right_heel_y) // 2

    distance_leg = math.sqrt(( avg_hip_x- avg_heel_x) ** 2 + ( avg_hip_y - avg_heel_y) ** 2)
    return distance_leg, (avg_hip_x, avg_hip_y), (avg_heel_x, avg_heel_y)

def calculate_hand_length(landmarks, width, height):
    shoulder = landmarks[12]  # RIGHT_SHOULDER (ID: 12)
    wrist = landmarks[16]  # RIGHT_WRIST (ID: 16)
    shoulder_x, shoulder_y = int(shoulder.x * width), int(shoulder.y * height)
    wrist_x, wrist_y = int(wrist.x * width), int(wrist.y * height)
    hand_length = math.sqrt((wrist_x - shoulder_x) ** 2 + (wrist_y - shoulder_y) ** 2)
    return hand_length, (shoulder_x, shoulder_y), (wrist_x, wrist_y)
def calculate_chest_width(landmarks, width, height):
    shoulder_r = landmarks[12]  # RIGHT_SHOULDER (ID: 12)
    shoulder_l = landmarks[11]  # LEFT_SHOULDER (ID: 11)
    shoulder_r_x, shoulder_r_y = int(shoulder_r.x * width), int(shoulder_r.y * height)
    shoulder_l_x, shoulder_l_y = int(shoulder_l.x * width), int(shoulder_l.y * height)
    chest_width = math.sqrt((shoulder_r_x - shoulder_l_x) ** 2 + (shoulder_r_y - shoulder_l_y) ** 2)
    return chest_width, (shoulder_l_x, shoulder_l_y), (shoulder_r_x, shoulder_r_y)
def calculate_hip_width(landmarks, width, height):
    hip_r = landmarks[24]  # RIGHT_HIP (ID: 24)
    hip_l = landmarks[23]  # LEFT_HIP (ID: 23)
    hip_r_x, hip_r_y = int(hip_r.x * width), int(hip_r.y * height)
    hip_l_x, hip_l_y = int(hip_l.x * width), int(hip_l.y * height)
    hip_width = math.sqrt((hip_r_x - hip_l_x) ** 2 + (hip_r_y - hip_l_y) ** 2)
    return hip_width, (hip_l_x, hip_l_y), (hip_r_x, hip_r_y)


def draw_line(image, start_point, end_point, color=(255, 0, 0), thickness=3):
    cv.line(image, start_point, end_point, color, thickness)

def pro_image(image, the_height):
    # from model.users_measure import Measurement
    # Initialize MediaPipe Pose model
    mpPose = mp.solutions.pose
    pose = mpPose.Pose()
    myDraw = mp.solutions.drawing_utils

    # Load the image, Resize the image and Convert BGR to RGB
    img = cv.imread(image)
    resized_img = resize(img)
    newImg = cv.cvtColor(resized_img, cv.COLOR_BGR2RGB)

    # Process the image to find pose landmarks
    results = pose.process(newImg)

    if results.pose_landmarks:
        # Draw landmarks on the resized image
        myDraw.draw_landmarks(resized_img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)

        # Get the image dimensions
        height, width, _ = resized_img.shape
        #height
        T_height, nose, heel =  cal_height(results.pose_landmarks.landmark, width, height)
      
        #leg
        T_leg, hip_point, avg_heel_point = cal_leg(results.pose_landmarks.landmark, width, height)
        result = int(T_leg) * int(the_height)
        new_leg = result //T_height
        print("new leg:",new_leg, T_leg)
       
        #hand
        T_hand, shoulder, wrist = calculate_hand_length(results.pose_landmarks.landmark, width, height)
        result = int(T_hand) * int(the_height)
        new_hand = result //T_height
        print("new hand:",new_hand, T_hand)
        #chest
        T_chest, shoulder_r, shoulder_l = calculate_chest_width(results.pose_landmarks.landmark, width, height)
        result = int(T_chest) * int(the_height)
        new_chest = result //T_height
        print("new chest:",new_chest, T_chest)
        #hip
        T_hip, hip_r, hip_l = calculate_hip_width(results.pose_landmarks.landmark, width, height)
        result = int(T_hip) * int(the_height)
        new_hip = result //T_height
        print("new hip:",new_hip, T_hip)
        # return (T_height, T_leg, T_hand, T_chest, T_hip)
        return (the_height, new_leg, new_hand, new_chest,new_hip)
        # cv.imshow("me", resized_img)

        cv.waitKey(0)
        cv.destroyAllWindows()
# pro_image('image/me2.jpg')
