document.addEventListener('DOMContentLoaded', function () {
    const containerList = document.querySelectorAll('.container');
  
    containerList.forEach(function (container) {
      const showSelectItems = container.querySelector('.show-select-items');
      const arrow = container.querySelector('.arrow');
      const selectedOptionsContainer = container.querySelector('.selected-options');
      const options = container.querySelectorAll('.option');
      const searchInput = container.querySelector('.search-tags');
  
      arrow.addEventListener('click', function () {
        showSelectItems.classList.toggle('open');
        const icon = arrow.querySelector('i');
        icon.classList.toggle('fa-angle-down');
        icon.classList.toggle('fa-angle-up');
      });
  
      // Function to close select box when clicking outside of it
      function closeSelectBox(event) {
        if (!showSelectItems.contains(event.target) && !arrow.contains(event.target)) {
          showSelectItems.classList.remove('open');
          const icon = arrow.querySelector('i');
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
        }
      }
  
      // Event listener for clicks on the document
      document.addEventListener('click', closeSelectBox);
  
      // Prevent closing the select box when clicking inside it
      showSelectItems.addEventListener('click', function (event) {
        event.stopPropagation();
      });
      function setHiddenInputValue(selectedValues) {
        const hiddenInput = container.querySelector('.tags_input');
        console.log(hiddenInput,'============',selectedValues)
        hiddenInput.value = selectedValues;
      }
  
      function clearHiddenInputValue() {
        const hiddenInput = container.querySelector('.tags_input');
        hiddenInput.value = '';
      }
  
      options.forEach(function (option) {
        option.addEventListener('click', function () {
          // Clone the option element
          const clonedOption = option.cloneNode(true);
  
          // Remove the clicked option from the options list
          option.remove();
  
          // Create span element for selected option
          const selectedOptionSpan = document.createElement('span');
          selectedOptionSpan.className = 'tag';
          selectedOptionSpan.textContent = clonedOption.dataset.value;
  
          // Create remove button for selected option
          const removeButton = document.createElement('span');
          removeButton.className = 'remove-tag';
          removeButton.innerHTML = '<i class="fa fa-close"></i>';

  
          // Add click event listener to remove button
          removeButton.addEventListener('click', function () {
            // Remove the span element from selected options container
            selectedOptionSpan.remove();
            container.querySelector('.options').appendChild(option);
            clearHiddenInputValue();
  
            // Add the removed option back to the options list
            container.querySelector('.options').appendChild(option);
          });
  
          // Append remove button to selected option span
          selectedOptionSpan.appendChild(removeButton);
  
          // Append selected option span to selected options container
          selectedOptionsContainer.appendChild(selectedOptionSpan);
        });
      });
  
      // Add event listener for search input
      searchInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
  
        options.forEach(function (option) {
          const optionText = option.dataset.value.toLowerCase();
          if (optionText.includes(searchText)) {
            option.style.display = 'block';
          } else {
            option.style.display = 'none';
          }
        });
      });
    });
  });