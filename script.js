// Function to add a new food item input field
function addFoodItem() {
    const foodItemsDiv = document.getElementById('food-items');
    const newFoodItemDiv = document.createElement('div');
    newFoodItemDiv.classList.add('food-item');
    newFoodItemDiv.innerHTML = `
        <label for="food">Food:</label>
        <input type="text" class="food" name="food" required>
        <label for="calories">Calories:</label>
        <input type="number" class="calories" name="calories" required>
    `;
    foodItemsDiv.appendChild(newFoodItemDiv);
}

// Function to calculate BMI and total calories
function calculateBMIAndCalories() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;

    if (age && gender && height && weight && activity) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        let bmr;

        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        let activityFactor;
        switch (activity) {
            case 'sedentary':
                activityFactor = 1.2;
                break;
            case 'lightly active':
                activityFactor = 1.375;
                break;
            case 'moderately active':
                activityFactor = 1.55;
                break;
            case 'very active':
                activityFactor = 1.725;
                break;
            default:
                activityFactor = 1.0;
        }

        const dailyCalories = (bmr * activityFactor).toFixed(2);

        const foodItems = document.querySelectorAll('.food-item');
        let totalCalories = 0;

        foodItems.forEach(item => {
            const calories = item.querySelector('.calories').value;
            if (calories) {
                totalCalories += parseFloat(calories);
            }
        });

        const userResult = document.getElementById('user-result');
        userResult.innerHTML = '';  // Clear previous results

        const results = [
            `BMI: ${bmi}`,
            `Daily Caloric Needs: ${dailyCalories} calories`,
            `Total Calories from Food: ${totalCalories} calories`,
            getDietSuggestion(bmi, totalCalories, dailyCalories)
        ];

        results.forEach(line => {
            const lineElement = document.createElement('p');
            lineElement.textContent = line;
            userResult.appendChild(lineElement);
        });
    }
}

// Function to get diet suggestions based on BMI and calorie intake
function getDietSuggestion(bmi, totalCalories, dailyCalories) {
    let suggestion = '';
    if (totalCalories > dailyCalories) {
        suggestion = 'You have consumed more calories than your daily requirement. Consider reducing your intake.';
    } else if (totalCalories < dailyCalories) {
        suggestion = 'You have consumed fewer calories than your daily requirement. Consider increasing your intake.';
    } else {
        suggestion = 'You have consumed the exact number of calories as your daily requirement. Keep it up!';
    }

    if (bmi < 18.5) {
        suggestion += ' Your BMI suggests that you are underweight. Increase calorie intake with nutrient-rich foods.';
    } else if (bmi < 24.9) {
        suggestion += ' Your BMI is normal. Maintain your current calorie intake with a balanced diet.';
    } else if (bmi < 29.9) {
        suggestion += ' Your BMI suggests that you are overweight. Consider reducing calorie intake and increasing activity.';
    } else {
        suggestion += ' Your BMI suggests that you are obese. Consult with a healthcare provider for a tailored diet plan.';
    }

    return suggestion;
}

