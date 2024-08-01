document.getElementById('feet').addEventListener('input', updateHeightCm);
document.getElementById('inches').addEventListener('input', updateHeightCm);
document.getElementById('weight').addEventListener('input', updateWeightLbs);
document.getElementById('calculateBtn').addEventListener('click', calculateBMI);
document.getElementById('clearBtn').addEventListener('click', clearAll);

function updateHeightCm() {
    const feet = parseFloat(document.getElementById('feet').value) || 0;
    const inches = parseFloat(document.getElementById('inches').value) || 0;

    const heightCm = (feet * 30.48) + (inches * 2.54);
    document.getElementById('heightCm').value = heightCm.toFixed(2);
}

function updateWeightLbs() {
    const weightKg = parseFloat(document.getElementById('weight').value) || 0;
    const weightLbs = (weightKg * 2.20462).toFixed(2);
    document.getElementById('weightLbs').value = weightLbs;
}

function calculateBMI() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const heightCm = parseFloat(document.getElementById('heightCm').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (heightCm > 0 && weight > 0) {
        const bmi = (weight / (heightCm / 100) ** 2).toFixed(2);
        document.getElementById('bmiValue').innerText = bmi;

        let category = '';
        let advice = '';
        let minWeight, maxWeight;

        if (bmi < 18.5) {
            category = 'Underweight';
            advice = gender === 'male' ?
                'You are underweight for your height. Consider gaining healthy weight through strength training and a balanced diet rich in proteins.' :
                'You are underweight for your height. It’s recommended to gain some healthy weight. A balanced diet with nutrient-rich foods can help.';
            minWeight = (18.5 * (heightCm / 100) ** 2).toFixed(1);
            maxWeight = (24.9 * (heightCm / 100) ** 2).toFixed(1);
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
            advice = gender === 'male' ?
                'Your weight is within the healthy range. Maintain your fitness level with regular strength and cardiovascular training.' :
                'Your weight is within the healthy range. Continue with a balanced diet and regular exercise to maintain your health.';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            advice = gender === 'male' ?
                'You are overweight for your height. Incorporate more cardiovascular exercises and consider a structured fitness plan to reach a healthier weight.' :
                'You are overweight for your height. Focusing on a balanced diet and regular exercise can help you reach a healthier weight.';
            minWeight = (18.5 * (heightCm / 100) ** 2).toFixed(1);
            maxWeight = (24.9 * (heightCm / 100) ** 2).toFixed(1);
        } else {
            category = 'Obesity';
            advice = gender === 'male' ?
                'You are in the obesity range, which may impact your fitness. A comprehensive fitness and diet plan is recommended to reduce weight.' :
                'You are in the obesity range, which may impact your health. Consult with a healthcare provider for a tailored plan to reduce weight.';
            minWeight = (18.5 * (heightCm / 100) ** 2).toFixed(1);
            maxWeight = (24.9 * (heightCm / 100) ** 2).toFixed(1);
        }

        document.getElementById('bmiCategory').innerText = category;
        document.getElementById('bmiAdvice').innerText = advice;

        if (minWeight && maxWeight) {
            document.getElementById('weightRange').innerText = `To be in a healthy range, your weight should be between ${minWeight} kg and ${maxWeight} kg.`;
        } else {
            document.getElementById('weightRange').innerText = '';
        }

        // Expand the calculator to fit the results
        document.querySelector('.bmi-calculator').style.maxHeight = '600px'; // Adjust as needed

        // Show the "Clear & Check Again" button
        document.getElementById('clearBtn').classList.remove('hidden');
    } else {
        alert("Please enter valid height and weight!");
    }
}

function clearAll() {
    document.getElementById('bmiForm').reset();
    document.getElementById('heightCm').value = '';
    document.getElementById('weightLbs').value = '';
    document.getElementById('bmiValue').innerText = '';
    document.getElementById('bmiCategory').innerText = '';
    document.getElementById('bmiAdvice').innerText = '';
    document.getElementById('weightRange').innerText = '';

    // Reset calculator height
    document.querySelector('.bmi-calculator').style.maxHeight = '350px'; // Compact height

    // Hide the "Clear & Check Again" button
    document.getElementById('clearBtn').classList.add('hidden');
}
