document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const resultsDiv = document.getElementById('results');
    
    // Rock density in tons per cubic yard (varies by size)
    const rockDensity = {
        small: 1.35,   // tons per cubic yard
        medium: 1.25,  // tons per cubic yard
        large: 1.15    // tons per cubic yard
    };
    
    // Average price per ton (will vary by location)
    const rockPrice = {
        small: 120,    // dollars per ton
        medium: 150,   // dollars per ton
        large: 200     // dollars per ton
    };
    
    calculateBtn.addEventListener('click', function() {
        // Get input values
        const length = parseFloat(document.getElementById('length').value) || 0;
        const width = parseFloat(document.getElementById('width').value) || 0;
        const depth = parseFloat(document.getElementById('depth').value) || 0;
        const rockSize = document.getElementById('rock-size').value;
        
        // Validate inputs
        if (length <= 0 || width <= 0 || depth <= 0) {
            alert('Please enter valid positive numbers for all dimensions.');
            return;
        }
        
        // Calculate area
        const area = length * width;
        
        // Calculate volume in cubic feet (convert depth from inches to feet)
        const volume = area * (depth / 12);
        
        // Convert volume to cubic yards
        const volumeCubicYards = volume / 27;
        
        // Calculate tons needed based on rock size
        const tonsNeeded = volumeCubicYards * rockDensity[rockSize];
        
        // Calculate approximate cost
        const cost = tonsNeeded * rockPrice[rockSize];
        
        // Display results
        document.getElementById('area').textContent = area.toFixed(2) + ' sq ft';
        document.getElementById('volume').textContent = volume.toFixed(2) + ' cubic feet';
        document.getElementById('rock-needed').textContent = tonsNeeded.toFixed(2) + ' tons';
        document.getElementById('cost').textContent = '$' + cost.toFixed(2);
        
        // Show results
        resultsDiv.classList.add('show');
    });
    
    resetBtn.addEventListener('click', function() {
        // Reset input fields
        document.getElementById('length').value = '';
        document.getElementById('width').value = '';
        document.getElementById('depth').value = '2';
        document.getElementById('rock-size').value = 'medium';
        
        // Hide results
        resultsDiv.classList.remove('show');
    });
    
    // Add input validation to prevent negative numbers
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});