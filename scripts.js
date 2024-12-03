document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('clientForm');
    const progressBar = document.getElementById('formProgress');
  
    let requiredFields = [
        'gender', 'firstName', 'lastName', 'birthDate', 'personalCode',
        'phone', 'address', 'email', 'lastDigits'
    ];
  
    const fieldIds = [
        'gender', 'firstName', 'secondName', 'lastName', 'lastDigits',
        'birthDate', 'personalCode', 'education', 'lastInstitution',
        'graduationYear', 'qualification', 'degree', 'phone', 'email',
        'address', 'maritalStatus', 'spouseFirstName', 'spouseSecondName',
        'spouseLastName', 'professionalStatus', 'studyLevel', 'studyCourse',
        'studyInstitution', 'expectedGraduationYear', 'workInstitution',
        'position', 'unemploymentReason', 'leaveEndDate', 'workExperience',
        'workField'
    ];
  
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.value = '';
        }
    });
  
    function updateProgress() {
        const education = document.getElementById('education');
    
        if (education && education.offsetParent !== null && education.value) {
            if (!requiredFields.includes('lastInstitution')) requiredFields.push('lastInstitution');
            if (!requiredFields.includes('graduationYear')) requiredFields.push('graduationYear');
    
            if (['profesinis', 'aukštasis-kolegijinis', 'aukštasis-universitetinis'].includes(education.value)) {
                if (!requiredFields.includes('qualification')) requiredFields.push('qualification');
            } else {
                requiredFields = requiredFields.filter(field => field !== 'qualification');
            }
    
            if (education.value === 'aukštasis-universitetinis') {
                if (!requiredFields.includes('degree')) requiredFields.push('degree');
            } else {
                requiredFields = requiredFields.filter(field => field !== 'degree');
            }
        } else {
            requiredFields = requiredFields.filter(field => !['lastInstitution', 'graduationYear', 'qualification', 'degree'].includes(field));
        }
    
        const filledFields = requiredFields.filter(field => {
            const element = document.getElementById(field);
            if (element) {
                if (element.type === 'select-one') {
                    return element.value !== '';
                }
                return element.value.trim() !== '';
            }
            return false;
        });
    
        const progress = Math.round((filledFields.length / requiredFields.length) * 100);
        progressBar.style.width = progress + '%';
        progressBar.style.backgroundColor = getProgressColor(progress);
    }
    
    function getProgressColor(progress) {
        const red = Math.max(255 - progress * 2.55, 0);
        const green = Math.min(progress * 2.55, 255);
        return `rgb(${red}, ${green}, 0)`;
    }
  
    function calculateAge(birthDate) {
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      const minDate = new Date('1900-01-01');
  
      if (birthDateObj < minDate) {
          alert('Gimimo data negali būti ankstesnė nei 1900-01-01.');
          document.getElementById('birthDate').value = ''; 
          return null; 
      }
  
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
      }
  
      return age;
  }
      const graduationYearInput = document.getElementById('graduationYear');
      
      function setGraduationYearRange() {
          const today = new Date();
          const maxDate = today.toISOString().split('T')[0]; 
          const minDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate())
                          .toISOString().split('T')[0]; 
          
          graduationYearInput.setAttribute('min', minDate);
          graduationYearInput.setAttribute('max', maxDate);
      }
  
      setGraduationYearRange();
  
      document.addEventListener('DOMContentLoaded', function () {
        const graduationYearInput = document.getElementById('graduationYear');
        const birthDateInput = document.getElementById('birthDate');
    
        function setGraduationYearRange() {
            const today = new Date();
    
            const birthDateValue = birthDateInput.value;
            if (!birthDateValue) {
                graduationYearInput.setAttribute('disabled', true);
                graduationYearInput.removeAttribute('min');
                graduationYearInput.removeAttribute('max');
                return;
            }
    
            const birthDate = new Date(birthDateValue);
    
            const minDate = new Date(birthDate.getFullYear() + 16, birthDate.getMonth(), birthDate.getDate())
                .toISOString()
                .split('T')[0];
    
            const maxDate = today.toISOString().split('T')[0];
    
            graduationYearInput.removeAttribute('disabled');
            graduationYearInput.setAttribute('min', minDate);
            graduationYearInput.setAttribute('max', maxDate);
        }
    
        birthDateInput.addEventListener('change', setGraduationYearRange);
    
        graduationYearInput.addEventListener('change', function () {
            const selectedDate = new Date(this.value);
            if (
                selectedDate < new Date(graduationYearInput.min) ||
                selectedDate > new Date(graduationYearInput.max)
            ) {
                alert(
                    `Pasirinkta baigimo data turi būti tarp ${graduationYearInput.min} ir ${graduationYearInput.max}.`
                );
                this.value = ''; 
            }
        });
    
        setGraduationYearRange();
    });
  
    document.getElementById('birthDate').addEventListener('change', function () {
        const selectedDate = new Date(this.value);
        const today = new Date();
  
        if (selectedDate > today) {
            alert('Gimimo data negali būti ateityje.');
            this.value = '';
            const educationFieldset = document.getElementById('educationFieldset');
            const education = document.getElementById('education');
            educationFieldset.style.display = 'none';
            education.disabled = false;
            return;
        }
  
        toggleFieldsBasedOnAge();
    });
  
    function toggleFieldsBasedOnAge() {
        const birthDate = document.getElementById('birthDate').value;
        if (!birthDate) return;
  
        const age = calculateAge(birthDate);
  
        const educationFieldset = document.getElementById('educationFieldset');
        const maritalStatusFieldset = document.getElementById('maritalStatusFieldset');
        const professionalStatusFieldset = document.getElementById('professionalStatusFieldset');
        const workExperienceFieldset = document.getElementById('workExperienceFieldset');
        const education = document.getElementById('education');
  
        if (age <= 17 && age >= 11) {
            education.value = 'pagrindinis';
            educationFieldset.style.display = 'none';
            education.disabled = true;
        } else if (age < 11) {
            education.value = null;
            educationFieldset.style.display = 'none';
            education.disabled = true;
        } else {
            education.value = '';
            educationFieldset.style.display = 'block';
            education.disabled = false;
        }
  
        maritalStatusFieldset.style.display = age >= 16 ? 'block' : 'none';
        professionalStatusFieldset.style.display = age >= 18 ? 'block' : 'none';
        workExperienceFieldset.style.display = age >= 18 ? 'block' : 'none';
  
        if (age >= 16) {
            if (!requiredFields.includes('education')) requiredFields.push('education');
            if (!requiredFields.includes('maritalStatus')) requiredFields.push('maritalStatus');
        } else {
            requiredFields = requiredFields.filter(field => field !== 'education' && field !== 'maritalStatus');
        }
  
        if (age >= 18) {
            const professionalStatusFieldset = document.getElementById('professionalStatusFieldset');
            if (professionalStatusFieldset.style.display !== 'none') {
                if (!requiredFields.includes('professionalStatus')) requiredFields.push('professionalStatus');
                if (!requiredFields.includes('workExperience')) requiredFields.push('workExperience');
                if (!requiredFields.includes('workField')) requiredFields.push('workField');
                toggleWorkExperienceFieldset(true);
            } else {
                requiredFields = requiredFields.filter(field => !['professionalStatus', 'workExperience', 'workField'].includes(field));
            }
        } else {
            requiredFields = requiredFields.filter(field => !['professionalStatus', 'workExperience', 'workField'].includes(field));
            toggleWorkExperienceFieldset(false);
        }
  
        if (age > 17 && age < 23) {
            const validOptions = ['pagrindinis', 'vidurinis', 'profesinis', ''];
            const currentValue = education.value;
  
            Array.from(education.options).forEach(option => {
                option.disabled = !validOptions.includes(option.value);
            });
  
            if (!validOptions.includes(currentValue)) {
                education.value = '';
            }
        } else {
            Array.from(education.options).forEach(option => {
                option.disabled = false;
            });
        }
  
        updateProgress();
    }
  
    document.getElementById('birthDate').addEventListener('change', toggleFieldsBasedOnAge);
  
    document.querySelectorAll('.letters-only').forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^\p{L}]/gu, '');
        });
    });
  
    document.getElementById('lastDigits').addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        updateProgress();
    });
  
    document.getElementById('maritalStatus').addEventListener('change', function () {
        const maritalStatus = this.value;
        const spouseNameDiv = document.getElementById('spouseName');
    
        spouseNameDiv.innerHTML = '';
    
        if (maritalStatus === 'vedęs') {
            spouseNameDiv.innerHTML = `
                <div class="form-group">
                    <label for="spouseFirstName">* Sutuoktinio vardas:</label>
                    <input type="text" id="spouseFirstName" name="spouseFirstName" class="letters-only" pattern="[A-Za-zÀ-ž]+" required>
                </div>
                <div class="form-group">
                    <label for="spouseSecondName">Sutuoktinio antrasis vardas:</label>
                    <input type="text" id="spouseSecondName" name="spouseSecondName" class="letters-only" pattern="[A-Za-zÀ-ž]+">
                </div>
                <div class="form-group">
                    <label for="spouseLastName">* Sutuoktinio pavardė:</label>
                    <input type="text" id="spouseLastName" name="spouseLastName" class="letters-only" pattern="[A-Za-zÀ-ž]+" required>
                </div>
            `;
    
            document.getElementById('spouseFirstName').addEventListener('input', updateProgress);
            document.getElementById('spouseLastName').addEventListener('input', updateProgress);
    
            if (!requiredFields.includes('spouseFirstName')) requiredFields.push('spouseFirstName');
            if (!requiredFields.includes('spouseLastName')) requiredFields.push('spouseLastName');
        } else {
            requiredFields = requiredFields.filter(field => !['spouseFirstName', 'spouseLastName'].includes(field));
        }
    
        updateProgress();
    });
    document.getElementById('professionalStatusFieldset').addEventListener('visibilitychange', function () {
        const professionalStatusFieldset = document.getElementById('professionalStatusFieldset');
        const professionalStatus = document.getElementById('professionalStatus');
    
        if (professionalStatusFieldset.style.display !== 'none') {
            professionalStatus.required = true;
            if (!requiredFields.includes('professionalStatus')) requiredFields.push('professionalStatus');
        } else {
            professionalStatus.required = false;
            requiredFields = requiredFields.filter(field => field !== 'professionalStatus');
        }
        updateProgress();
    });

    function toggleWorkExperienceFieldset(isVisible) {
        const workExperience = document.getElementById('workExperience');
        const workField = document.getElementById('workField');
    
        if (isVisible) {
            document.getElementById('workExperienceFieldset').style.display = 'block';
            
            workExperience.required = true;
            workField.required = true;
    
            if (!requiredFields.includes('workExperience')) requiredFields.push('workExperience');
            if (!requiredFields.includes('workField')) requiredFields.push('workField');
    
            workExperience.addEventListener('input', updateProgress);
            workField.addEventListener('input', updateProgress);
        } else {
            document.getElementById('workExperienceFieldset').style.display = 'none';
    
            workExperience.required = false;
            workField.required = false;
    
            requiredFields = requiredFields.filter(field => field !== 'workExperience' && field !== 'workField');
        }
    
        updateProgress();
    }

    document.getElementById('education').addEventListener('change', function () {
        const educationDetails = document.getElementById('educationDetails');
        const qualificationGroup = document.getElementById('qualificationGroup');
        const degreeGroup = document.getElementById('degreeGroup');
        const lastInstitution = document.getElementById('lastInstitution');
        const graduationYear = document.getElementById('graduationYear');
        const degree = document.getElementById('degree');
        const qualification = document.getElementById('qualification');
  
        educationDetails.style.display = 'none';
        qualificationGroup.style.display = 'none';
        degreeGroup.style.display = 'none';
        lastInstitution.required = false;
        graduationYear.required = false;
        qualification.required = false;
  
        switch (this.value) {
            case 'pagrindinis':
                educationDetails.style.display = 'block';
                lastInstitution.required = true;
                graduationYear.required = true;
                break;
            case 'vidurinis':
                educationDetails.style.display = 'block';
                lastInstitution.required = true;
                graduationYear.required = true;
                break;
            case 'profesinis':
                educationDetails.style.display = 'block';
                qualificationGroup.style.display = 'block';
                lastInstitution.required = true;
                graduationYear.required = true;
                break;
            case 'aukštasis-kolegijinis':
                educationDetails.style.display = 'block';
                qualificationGroup.style.display = 'block';
                lastInstitution.required = true;
                graduationYear.required = true;
                qualification.required = true;
                degree.value = 'profesinis bakalauras';
                break;
            case 'aukštasis-universitetinis':
                educationDetails.style.display = 'block';
                qualificationGroup.style.display = 'block';
                degreeGroup.style.display = 'block';
                lastInstitution.required = true;
                graduationYear.required = true;
                qualification.required = true;
                degree.required = true;
                Array.from(degree.options).forEach(option => {
                    if (option.value === 'profesinis bakalauras') {
                        option.remove();
                    }
                });
                break;
        }
        updateProgress();
    });
    document.getElementById('graduationYear').addEventListener('input', updateProgress);
    document.getElementById('education').addEventListener('change', updateProgress);
    document.getElementById('qualification').addEventListener('change', updateProgress);
    document.getElementById('lastInstitution').addEventListener('change', updateProgress);
    document.getElementById('degree').addEventListener('change', updateProgress);
    document.getElementById('maritalStatus').addEventListener('change', updateProgress);

    function generatePersonalCode() {
        const gender = document.getElementById('gender').value;
        const birthDate = document.getElementById('birthDate').value;
        const lastDigits = document.getElementById('lastDigits').value;
  
        if (!gender || !birthDate || !lastDigits) {
            document.getElementById('personalCode').value = '';
            return;
        }
  
        if (!/^\d{4}$/.test(lastDigits)) {
            document.getElementById('personalCode').value = '';
            return;
        }
  
        const birthDateObj = new Date(birthDate);
        let year = birthDateObj.getFullYear();
        let month = String(birthDateObj.getMonth() + 1).padStart(2, '0');
        let day = String(birthDateObj.getDate()).padStart(2, '0');
  
        let genderDigit;
        if (year >= 1800 && year <= 1899) {
            genderDigit = gender === 'vyras' ? 1 : 2;
        } else if (year >= 1900 && year <= 1999) {
            genderDigit = gender === 'vyras' ? 3 : 4;
        } else if (year >= 2000) {
            genderDigit = gender === 'vyras' ? 5 : 6;
        }
  
        const personalCode = `${genderDigit}${year.toString().substr(-2)}${month}${day}${lastDigits}`;
        document.getElementById('personalCode').value = personalCode;
    }
  
    document.getElementById('gender').addEventListener('change', generatePersonalCode);
    document.getElementById('birthDate').addEventListener('change', generatePersonalCode);
    document.getElementById('lastDigits').addEventListener('input', generatePersonalCode);
  
    function validatePhoneNumber() {
        const phoneInput = document.getElementById('phone');
        const phoneNumber = phoneInput.value.replace(/\s/g, '');
        if (!/^\+370\d{8}$/.test(phoneNumber)) {
            phoneInput.setCustomValidity('Įveskite galiojantį Lietuvos telefono numerį (+370xxxxxxxx)');
        } else {
            phoneInput.setCustomValidity('');
        }
    }
  
    document.getElementById('phone').addEventListener('input', validatePhoneNumber);
  
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const email = emailInput.value;
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.setCustomValidity('Įveskite galiojantį el. pašto adresą');
        } else {
            emailInput.setCustomValidity('');
        }
    }
  
    document.getElementById('email').addEventListener('input', validateEmail);

    document.getElementById('education').addEventListener('change', function () { // aukstasis-universitetinis only
        const education = this.value;
        const degreeGroup = document.getElementById('degreeGroup');
        const degree = document.getElementById('degree');
    

        degreeGroup.style.display = 'none';
        degree.removeAttribute('required');
    
        if (education === 'aukštasis-universitetinis') {
            degreeGroup.style.display = 'block';
            degree.setAttribute('required', true);
        }
    });

    document.getElementById('professionalStatus').addEventListener('change', function () {
        const professionalDetails = document.getElementById('professionalDetails');
        professionalDetails.innerHTML = ''; 
    
        requiredFields = requiredFields.filter(field =>
            !['studyLevel', 'studyCourse', 'studyInstitution', 'expectedGraduationYear', 'workInstitution', 'position', 'unemploymentReason', 'leaveEndDate'].includes(field)
        );
    
        switch (this.value) {
            case 'studijuoja':
                professionalDetails.innerHTML = `
                    <div class="form-group">
                        <label for="studyLevel">* Studijų pakopa:</label>
                        <select id="studyLevel" name="studyLevel" required>
                            <option value="">Pasirinkite</option>
                            <option value="bakalauras">Pirmoji (bakalauras)</option>
                            <option value="magistras">Antroji (magistras)</option>
                            <option value="doktorantura">Trečioji (doktorantūra)</option>
                        </select>
                    </div>
                    <div class="form-group" id="courseGroup">
                        <label for="studyCourse">* Kursas:</label>
                        <select id="studyCourse" name="studyCourse" required>
                            <option value="">Pasirinkite</option>
                            <option value="firstCourse">Pirmas (1)</option>
                            <option value="secondCourse">Antras (2)</option>
                            <option value="thirdCourse">Trečias (3)</option>
                            <option value="fourthCourse">Ketvirtas (4)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="studyInstitution">* Įstaiga:</label>
                        <input type="text" id="studyInstitution" name="studyInstitution" required>
                    </div>
                    <div class="form-group">
                        <label for="expectedGraduationYear">* Tikėtini baigimo metai:</label>
                        <input type="date" id="expectedGraduationYear" name="expectedGraduationYear" required>
                    </div>
                `;
    
                ['studyLevel', 'studyCourse', 'studyInstitution', 'expectedGraduationYear'].forEach(field => {
                    if (!requiredFields.includes(field)) requiredFields.push(field);
                    document.getElementById(field).addEventListener('input', updateProgress);
                });
    
                break;
    
            case 'dirba':
                professionalDetails.innerHTML = `
                    <div class="form-group">
                        <label for="workInstitution">* Darbo įstaiga:</label>
                        <input type="text" id="workInstitution" name="workInstitution" required>
                    </div>
                    <div class="form-group">
                        <label for="position">* Pareigos:</label>
                        <input type="text" id="position" name="position" required>
                    </div>
                `;
    
                ['workInstitution', 'position'].forEach(field => {
                    if (!requiredFields.includes(field)) requiredFields.push(field);
                    document.getElementById(field).addEventListener('input', updateProgress);
                });
    
                break;
    
            case 'nedirba':
                professionalDetails.innerHTML = `
                    <div class="form-group">
                        <label for="unemploymentReason">* Nedarbo priežastis:</label>
                        <input type="text" id="unemploymentReason" name="unemploymentReason" required>
                    </div>
                `;
    
                if (!requiredFields.includes('unemploymentReason')) requiredFields.push('unemploymentReason');
                document.getElementById('unemploymentReason').addEventListener('input', updateProgress);
    
                break;
    
            case 'motinystės/tėvystės atostogose':
                professionalDetails.innerHTML = `
                    <div class="form-group">
                        <label for="leaveEndDate">* Atostogų pabaiga:</label>
                        <input type="date" id="leaveEndDate" name="leaveEndDate" required>
                    </div>
                `;
    
                if (!requiredFields.includes('leaveEndDate')) requiredFields.push('leaveEndDate');
                document.getElementById('leaveEndDate').addEventListener('input', updateProgress);
    
                break;
        }
    
        updateProgress();
    });
    
    document.getElementById('clientForm').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const formData = {};
        const fieldIds = [
            'gender', 'firstName', 'secondName', 'lastName', 'lastDigits',
            'birthDate', 'personalCode', 'education', 'lastInstitution',
            'graduationYear', 'qualification', 'degree', 'phone', 'email',
            'address', 'maritalStatus', 'spouseFirstName', 'spouseSecondName',
            'spouseLastName', 'professionalStatus', 'studyLevel', 'studyCourse',
            'studyInstitution', 'expectedGraduationYear', 'workInstitution',
            'position', 'unemploymentReason', 'leaveEndDate', 'workExperience',
            'workField'
        ];
    
        fieldIds.forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                formData[id] = field.value.trim() === '' ? null : field.value.trim();
            } else {
                formData[id] = null;
            }
        });
    
        const json = JSON.stringify(formData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        const form = document.getElementById('clientForm');
        form.reset();
    
        document.getElementById('spouseName').innerHTML = ''; 
        document.getElementById('professionalDetails').innerHTML = ''; 
        document.getElementById('educationDetails').style.display = 'none'; 
        document.getElementById('qualificationGroup').style.display = 'none'; 
        document.getElementById('degreeGroup').style.display = 'none'; 
    
        requiredFields = [
            'gender', 'firstName', 'lastName', 'birthDate', 'personalCode',
            'phone', 'address', 'email', 'lastDigits'
        ];
    
        updateProgress();
    
        alert("Jūsų anketa sėkmingai išsaugota!");
    });
    
  
    const birthDateInput = document.getElementById('birthDate');
    const workExperienceInput = document.getElementById('workExperience');
  
    function validateWorkExperience() {
        const birthDate = birthDateInput.value;
        const workExperience = parseInt(workExperienceInput.value, 10);
  
        if (!birthDate || isNaN(workExperience)) return;
  
        const age = calculateAge(birthDate);
        const maxWorkExperience = Math.max(age - 18, 0); 
  
        if (workExperience < 0) {
            workExperienceInput.value = 0;
            alert('Darbo patirtis negali būti mažesnė už 0.');
        } else if (workExperience > maxWorkExperience) {
            workExperienceInput.value = maxWorkExperience;
            alert(`Darbo patirtis negali būti didesnė nei ${maxWorkExperience} metai.`);
        }
    }
  
    birthDateInput.addEventListener('change', validateWorkExperience);
    workExperienceInput.addEventListener('input', validateWorkExperience);
  
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updateProgress);
            field.addEventListener('change', updateProgress);
        }
    });
  });
  