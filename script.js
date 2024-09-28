document.getElementById('prematurityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os valores do formulário
    const birthDate = new Date(document.getElementById('birthDate').value);
    const gestationalWeeks = parseInt(document.getElementById('gestationalWeeks').value);
    const gestationalDays = parseInt(document.getElementById('gestationalDays').value);
    const currentDate = new Date(document.getElementById('currentDate').value);

    // Verificação para garantir que a data de nascimento seja anterior à data atual
    if (birthDate >= currentDate) {
        document.getElementById('result').innerHTML = "A data de nascimento deve ser anterior à data atual.";
        return;
    }

    // Calculando o número total de dias de gestação no nascimento
    const fullTermWeeks = 40; // Gestação completa
    const pretermWeeks = fullTermWeeks - gestationalWeeks;
    const pretermDays = (pretermWeeks - 1) * 7 + (7 - gestationalDays);

    // Ajustando a data de nascimento para obter a data corrigida
    const correctedBirthDate = dateFns.addDays(birthDate, pretermDays);

    // Calculando a diferença entre a data corrigida e a data atual
    const correctedAgeDifference = dateFns.intervalToDuration({ start: correctedBirthDate, end: currentDate });

    const ageActual = dateFns.intervalToDuration({ start: birthDate, end: currentDate });
    console.log(correctedAgeDifference);
    // Exibindo o resultado formatado
    const correctedAgeYear = correctedAgeDifference.years || 0;
    const correctedAgeMonths = correctedAgeDifference.months || 0;
    const correctedAgeWeeks = Math.floor(correctedAgeDifference.days / 7);
    const correctedAgeDays = correctedAgeDifference.days % 7;
    
    const actualAgeYear = ageActual.years || 0;
    const actualAgeMonths = ageActual.months || 0;
    const actualAgeWeeks = Math.floor(ageActual.days / 7);
    const actualAgeDays = ageActual.days % 7;

    console.log(actualAgeDays+gestationalDays);
    const weeksWrong = gestationalWeeks + actualAgeWeeks + (actualAgeMonths*4) + Math.floor((actualAgeDays+gestationalDays)/7);
    const daysWrong = (actualAgeDays+gestationalDays) % 7
    
    const actualYearMessage = actualAgeYear > 0 ? (actualAgeYear > 1 ? `${actualAgeYear} Anos, `: `${actualAgeYear} Ano, ` ): '';
    const correctYearMessage = correctedAgeYear > 0 ? (correctedAgeYear > 1 ? `${correctedAgeYear} Anos, `: `${correctedAgeYear} Ano, ` ): '';;
    
    const actualMonthsMessage = actualAgeMonths > 0 ? (actualAgeMonths > 1 ? `${actualAgeMonths} Mêses, `: `${actualAgeMonths} Mês, ` ): '';
    const correctedMonthsMessage = correctedAgeMonths > 0 ? (correctedAgeMonths > 1 ? `${correctedAgeMonths}  Mêses,  `: `${correctedAgeMonths} Mês, ` ): '';;
    
    const actualWeeksMessage = actualAgeWeeks > 0 ? (actualAgeWeeks > 1 ? `${actualAgeWeeks} Semanas, `: `${actualAgeWeeks} Semana, ` ): '';
    const correctedWeeksMessage = correctedAgeWeeks > 0 ? (correctedAgeWeeks > 1 ? `${correctedAgeWeeks} Semanas, `: `${correctedAgeWeeks} Semana, ` ): '';;
    
    const actualDaysMessage = actualAgeDays > 0 ? (actualAgeDays > 1 ? `${actualAgeDays} Dias `: `${actualAgeDays} Dias ` ): '';
    const correctedDaysMessage = correctedAgeDays > 0 ? (correctedAgeDays > 1 ? `${correctedAgeDays} Dias `: `${correctedAgeDays} Dias ` ): '';;
    const message = `Idade Corrigida:  ${correctYearMessage}${correctedMonthsMessage}${correctedWeeksMessage}${correctedDaysMessage}.`;
    document.getElementById('result-1').innerHTML = `Idade de cronologica: ${actualYearMessage}${actualMonthsMessage}${actualWeeksMessage}${actualDaysMessage}`;
    document.getElementById('result').innerHTML =  correctedAgeDays < 0 || correctedAgeMonths < 0 ? `Idade gestacional: ${weeksWrong} semanas e ${daysWrong} dias`: message;
});