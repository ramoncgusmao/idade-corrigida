document.getElementById('prematurityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const birthDate = new Date(document.getElementById('birthDate').value);
    const gestationalWeeks = parseInt(document.getElementById('gestationalWeeks').value);
    const gestationalDays = parseInt(document.getElementById('gestationalDays').value);
    const currentDate = new Date(document.getElementById('currentDate').value);

    // Verificação de erro
    if (birthDate >= currentDate) {
        document.getElementById('result').innerHTML = "A data de nascimento deve ser anterior à data atual.";
        return;
    }

    // Calcular a idade cronológica
    let ageInMilliseconds = currentDate - birthDate;
    let ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    // Diferença das semanas e dias gestacionais
    const fullTermWeeks = 40; // Gestação completa
    const pretermWeeks = fullTermWeeks - gestationalWeeks;
    const pretermDays = pretermWeeks * 7 - gestationalDays;

    // Calcular a idade corrigida
    const correctedAgeInDays = ageInDays - pretermDays;

    // Converter para meses e dias
    const correctedAgeMonths = Math.floor(correctedAgeInDays / 30);
    const correctedAgeDays = correctedAgeInDays % 30;

    // Exibir resultado
    document.getElementById('result').innerHTML = `Idade Corrigida: ${correctedAgeMonths} meses e ${correctedAgeDays} dias.`;
});
