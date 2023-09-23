document.addEventListener("DOMContentLoaded", function() {
    const stonePriceField = document.getElementById("stonePrice");
    const productDropdown = document.getElementById("productDropdown");
    const radioOptionsDiv = document.getElementById("radioOptions");
    const resultArea = document.getElementById("resultArea");
    const calculateButton = document.getElementById("calculateButton");

    const radioButtonOptions = {
        'Les Grands': [
            "1.5mm Helrund|577,2.5,1.5",
            "2.0mm Halvrund STANDARD|577,3,1.5",
            "2.0mm Helrund|577,3.8,2"
        ],
        'Les Bonbons': [
            "1.25mm Helrund|577,1.3,1.5",
            "1.5mm Helrund|577,2,1.5",
            "2.0mm Halvrund|577,2.8,1.5",
            "2.0mm Helrund|577,3.3,1.5"
        ],
        'Les Bonbons obehandlad safir': [
            "1.25mm Helrund|577,1.3,1.5",
            "1.5mm Helrund|577,2,1.5",
            "2.0mm Halvrund|577,2.8,1.5",
            "2.0mm Helrund|577,3.3,1.5"
        ]
    };

    productDropdown.addEventListener("change", updateRadioButtons);
    calculateButton.addEventListener("click", calculateTotalPrice);  // Attach the event listener
    updateRadioButtons();

    function updateRadioButtons() {
        radioOptionsDiv.innerHTML = '';

        const selectedCategory = productDropdown.value;
        const options = radioButtonOptions[selectedCategory];

        options.forEach(option => {
            const parts = option.split('|');
            const label = parts[0];
            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = 'productOption';
            radioButton.value = option;

            const radioLabel = document.createElement('label');
            radioLabel.textContent = label;

            radioOptionsDiv.appendChild(radioButton);
            radioOptionsDiv.appendChild(radioLabel);
            radioOptionsDiv.appendChild(document.createElement('br'));
        });
    }

    function calculateTotalPrice() {
        const selectedRadioButtonValue = document.querySelector('input[name="productOption"]:checked').value;
        
        let value = null;
        for (const options of Object.values(radioButtonOptions)) {
            for (const option of options) {
                if (option.startsWith(selectedRadioButtonValue.split('|')[0])) {
                    value = option.split('|')[1];
                    break;
                }
            }
        }

        if (value) {
            const values = value.split(',');
            const metalPrice = parseFloat(values[0]);
            const metalMultiplier = parseFloat(values[1]);
            const workHours = parseFloat(values[2]);

            const stonePrice = parseFloat(stonePriceField.value);
            const surcharge = getSurcharge(stonePrice);

            const metalCost = metalPrice * metalMultiplier;
            const workCost = 258 * workHours;
            const subtotal = stonePrice + metalCost + workCost;
            const totalBeforeTax = subtotal + surcharge;
            let totalWithTax = totalBeforeTax * 1.25;

            // Rounding up
            totalWithTax = Math.ceil(totalWithTax / 100) * 100;



            const result = `Total summa inkl moms: ${totalWithTax.toFixed(2)} kr`;





            resultArea.innerHTML = result;
        }
    }

    function getSurcharge(stonePrice) {
        const productSelected = productDropdown.value;
        switch (productSelected) {
            case "Les Grands":
                return getLesGrandsSurcharge(stonePrice);
            case "Les Bonbons":
                return getLesBonbonsSurcharge(stonePrice);
            case "Les Bonbons obehandlad safir":
                return getLesBonbonsObehandladSafirSurcharge(stonePrice);
            default:
                return 0;
        }
    }

    function getLesGrandsSurcharge(stonePrice) {
        if (stonePrice <= 500) return 4000;
        if (stonePrice <= 1000) return 5000;
        if (stonePrice <= 2000) return 5500;
        if (stonePrice <= 3500) return 6000;
        if (stonePrice <= 5000) return 6500;
        if (stonePrice <= 8000) return 7000;
        if (stonePrice <= 14000) return 7500;
        if (stonePrice <= 17000) return 9000;
        return 15000;
    }

    function getLesBonbonsSurcharge(stonePrice) {
        if (stonePrice <= 500) return 2500;
        if (stonePrice <= 1000) return 3000;
        if (stonePrice <= 2000) return 4000;
        if (stonePrice <= 3500) return 4500;
        if (stonePrice <= 5000) return 6000;
        if (stonePrice <= 6000) return 7000;
        return 7500;
    }

    function getLesBonbonsObehandladSafirSurcharge(stonePrice) {
        if (stonePrice <= 500) return 3000;
        if (stonePrice <= 1000) return 3500;
        if (stonePrice <= 2000) return 4500;
        if (stonePrice <= 3500) return 5000;
        if (stonePrice <= 5000) return 6500;
        if (stonePrice <= 6000) return 7500;
        return 8000;
    }
});
