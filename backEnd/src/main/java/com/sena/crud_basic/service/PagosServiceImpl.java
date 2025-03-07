package com.sena.crud_basic.service;


@Service
public class PayServiceImpl implements PayService{

}
@Service
public class PagosServiceImpl implements PagosService {

    @Autowired
    private PagosRepository pagosRepository;

    @Override
    public List<pagosDTO> getAllPagos() {
        return pagosRepository.findAll();
    }

    @Override
    public pagosDTO getPagoById(int id) {
        return pagosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado con ID: " + id));
    }

    @Override
    public pagosDTO createPago(pagosDTO pago) {
        return pagosRepository.save(pago);
    }

    @Override
    public pagosDTO updatePago(int id, pagosDTO pagoDetails) {
        pagosDTO pago = getPagoById(id);
        pago.setId_order(pagoDetails.getId_order());
        pago.setMetodoPago(pagoDetails.getMetodoPago());
        pago.setFechaPago(pagoDetails.getFechaPago());
        pago.setMonto(pagoDetails.getMonto());
        return pagosRepository.save(pago);
    }

    @Override
    public void deletePago(int id) {
        pagosDTO pago = getPagoById(id);
        pagosRepository.delete(pago);
    }
}