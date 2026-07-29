'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===== AGENDAMIENTO TABS ===== */
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

  /* ===== FORMULARIO → WHATSAPP ===== */
  const waForm = document.getElementById('waForm');
  if (waForm) {
    waForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(waForm);
      const nombre = fd.get('nombre')?.trim() || 'Cliente';
      const telefono = fd.get('telefono')?.trim() || '';
      const servicio = fd.get('servicio') || 'No especificado';
      const fecha = fd.get('fecha') || '';
      const hora = fd.get('hora') || '';
      const notas = fd.get('notas')?.trim();

      const fechaOk = fecha
        ? new Date(fecha + 'T12:00:00').toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
          })
        : 'Sin fecha';

      let msg = 'Hola, soy ' + nombre + '.';
      msg += ' Me gustaría agendar el servicio: ' + servicio + '.';
      msg += ' Para el día ' + fechaOk + ' a las ' + hora + '.';
      if (telefono) msg += ' Mi teléfono es ' + telefono + '.';
      if (notas) msg += ' Notas: ' + notas + '.';
      msg += ' Quedo atento a su confirmación.';

      window.open('https://wa.me/573006273575?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  /* ===== FECHA MÍNIMA ===== */
  const fi = document.getElementById('waFecha');
  if (fi) {
    const hoy = new Date();
    const y = hoy.getFullYear();
    const m = String(hoy.getMonth() + 1).padStart(2, '0');
    const d = String(hoy.getDate()).padStart(2, '0');
    fi.setAttribute('min', y + '-' + m + '-' + d);
  }

});
