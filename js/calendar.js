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

  /* ===== FORMULARIO -> WHATSAPP ===== */
  const waForm = document.getElementById('waForm');
  if (waForm) {
    waForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(waForm);
      const nombre = fd.get('nombre')?.trim() || 'Cliente';
      const telefono = fd.get('telefono')?.trim() || 'Sin telefono';
      const fecha = fd.get('fecha') || '';
      const hora = fd.get('hora') || '';
      const notas = fd.get('notas')?.trim();

      const selects = document.querySelectorAll('.wa-servicio-select');
      const servicios = Array.from(selects)
        .map(s => s.value)
        .filter(v => v);

      const fechaOk = fecha
        ? new Date(fecha + 'T12:00:00').toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
          })
        : 'Sin fecha';

      const horaOk = hora
        ? new Date('2000-01-01T' + hora).toLocaleTimeString('es-CO', {
            hour: 'numeric', minute: '2-digit', hour12: true
          })
        : 'Sin hora';

      let serviciosTexto = '';
      if (servicios.length > 0) {
        serviciosTexto = servicios.map(s => '- ' + s).join('\n');
      } else {
        serviciosTexto = '- No especificado';
      }

      const etiquetaServicio = servicios.length > 1
        ? '*Servicios solicitados:*'
        : '*Servicio solicitado:*';

      const bloqueNotas = notas
        ? '*Notas adicionales:* ' + notas + '\n\n'
        : '';

      const msg = '*¡Hola, VITALA!* Me gustaria agendar una cita.'
        + '\n\n'
        + '*Cliente:* ' + nombre.toUpperCase()
        + '\n'
        + '*Telefono:* ' + telefono
        + '\n\n'
        + etiquetaServicio + '\n' + serviciosTexto
        + '\n\n'
        + '*Fecha:* ' + fechaOk
        + '\n'
        + '*Hora:* ' + horaOk
        + '\n\n'
        + bloqueNotas
        + 'Quedo atento a su confirmacion. ¡Muchas gracias!';

      const url = 'https://wa.me/573006273575?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
    });
  }

  /* ===== MULTI-SERVICIO: AGREGAR / QUITAR ===== */
  const servicioContainer = document.getElementById('waServicioContainer');
  const addBtn = document.getElementById('addServicioBtn');

  if (servicioContainer && addBtn) {
    addBtn.addEventListener('click', () => {
      const firstRow = servicioContainer.querySelector('.servicio-row');
      const newRow = firstRow.cloneNode(true);
      const select = newRow.querySelector('.wa-servicio-select');
      select.value = '';
      select.removeAttribute('required');
      const removeBtn = newRow.querySelector('.servicio-row__remove');
      removeBtn.hidden = false;
      servicioContainer.appendChild(newRow);
      select.focus();
    });

    servicioContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.servicio-row__remove');
      if (btn && !btn.hidden) {
        const row = btn.closest('.servicio-row');
        if (row && servicioContainer.querySelectorAll('.servicio-row').length > 1) {
          row.remove();
        }
      }
    });
  }

  /* ===== FECHA MINIMA ===== */
  const fi = document.getElementById('waFecha');
  if (fi) {
    const hoy = new Date();
    const y = hoy.getFullYear();
    const m = String(hoy.getMonth() + 1).padStart(2, '0');
    const d = String(hoy.getDate()).padStart(2, '0');
    fi.setAttribute('min', y + '-' + m + '-' + d);
  }

});
