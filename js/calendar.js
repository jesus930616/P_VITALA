'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const agendaTabs = document.querySelectorAll('[data-agenda-tab]');
  const agendaPanels = {
    calendly: document.getElementById('agendaCalendly'),
    whatsapp: document.getElementById('agendaWhatsApp')
  };

  agendaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.agendaTab;
      agendaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.entries(agendaPanels).forEach(([key, panel]) => {
        if (panel) panel.classList.toggle('active', key === target);
      });
    });
  });

  const waForm = document.getElementById('waForm');
  if (waForm) {
    waForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(waForm);
      const n = fd.get('nombre')?.trim() || 'Cliente';
      const t = fd.get('telefono')?.trim() || '';
      const s = fd.get('servicio') || 'No especificado';
      const f = fd.get('fecha') || '';
      const h = fd.get('hora') || '';
      const notas = fd.get('notas')?.trim();

      const fechaOk = f
        ? new Date(f + 'T12:00:00').toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
          })
        : 'Sin fecha';

      let msg = `Hola, soy ${n}.`;
      msg += ` Me gustaría agendar el servicio: ${s}.`;
      msg += ` Para el día ${fechaOk} a las ${h}.`;
      if (t) msg += ` Mi teléfono es ${t}.`;
      if (notas) msg += ` Notas: ${notas}.`;
      msg += ' Quedo atento a su confirmación.';

      window.open(`https://wa.me/573006273575?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  const fi = document.getElementById('waFecha');
  if (fi) {
    const hoy = new Date();
    fi.setAttribute('min',
      `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}-${String(hoy.getDate()).padStart(2,'0')}`
    );
  }
});